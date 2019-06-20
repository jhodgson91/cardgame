import React, { Component, ReactNode } from 'react'
import './Main.scss'
import * as api from '../api'
import Hero from './Hero'
import PlayerWrapper from './PlayerWrapper'
import Player from './Player'
import Card from './Card'

//Define props types
export interface Props {

}

//Types for the state
export interface deckType {
	success: boolean,
	deck_id: string,
	shuffled: boolean,
	remaining: number,
	piles: {
		[name: string]: pileType
	}
}

export interface playerType {
	id: number,
	name: string,
	readOnly: boolean,
	theme: string,
	turn: boolean
}

export interface pileType {
	deck_id: string,
	name: string,
	cards: cardType[]
}

export interface cardType {
	image: string,
	value: string,
	suit: string,
	code: string
}

//Define state types
interface State {
	isReady: boolean
	deck: deckType
	drawFrom: 'top' | 'bottom'
	cardInit: number
	players: playerType[]
}

export default class Game extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			isReady: false,
			deck: {
				success: false,
				deck_id: "",
				shuffled: false,
				remaining: 0,
				piles: {}
			},
			drawFrom: 'top',
			cardInit: 26,
			players: [
				{ id: 0, name: 'house', readOnly: true, theme: "house", turn: false},
				{ id: 1, name: 'p1', readOnly: false, theme: "p1", turn: false},
				{ id: 2, name: 'p2', readOnly: false, theme: "p2", turn: false}
			]
		}
    //Binding function to class
    this.initialiseDeck = this.initialiseDeck.bind(this)
		this.handleTurn = this.handleTurn.bind(this)
    this.play = this.play.bind(this)
    this.showCards = this.showCards.bind(this)
    this.showHand = this.showHand.bind(this)
		this.resetGame = this.resetGame.bind(this)
		this.snap = this.snap.bind(this)
  }

	//Initialises the deck and adds all cards to the base pile
  async initialiseDeck() {
		let cardInit: number = this.state.cardInit
		let deck: deckType = this.state.deck    		
		let players: playerType[] = this.state.players
		let shuffled: boolean = true
		//Get the deck and id
		deck.deck_id = await api.newDeck(shuffled)
		//Save the deck id locally
		let deck_id: string = deck.deck_id
		//Draw all cards into nowhere
		let drawAllCards: cardType[] = await api.draw(deck_id, "deck", 52)
		let createHousePile: boolean = await api.add(deck_id, players[0].name, drawAllCards)
		//Update the house pile from the api
		deck = await api.update(deck_id, players[0].name, deck)
		//Add inititial cards to each pile and create them
		deck = await this.play(deck, players[0].name, players[1].name, cardInit)
		deck = await this.play(deck, players[0].name, players[2].name, cardInit)
		//Update the deck status, update state and return the deck for further use
		deck.success = true
		players[1].turn = true
		this.setState({
			deck: deck,
			players: players
		})
		return deck
	}
	
	//Get the new deck and then set the make the game ready
	async componentDidMount() {
		//Initiate the deck
		let deck: deckType = await this.initialiseDeck()
		if (deck.success) {
			this.setState({
				isReady: true
			})
		}
	}
  
	//Takes the current player and changes to the next valid player
	handleTurn(currentPlayer: string) {
		let isReady: boolean = this.state.isReady
		let success: boolean = this.state.deck.success
		let players: playerType[] = this.state.players
		let currentPlayerId: number = players.findIndex(i => i.name == currentPlayer)
		let nextPlayerId: number = players.length - currentPlayerId //Changes player ignoring 0
		//Check that the deck is prepped and it is the players turn
		if(isReady && success && players[currentPlayerId].turn) {
			players[currentPlayerId].turn = false
			players[nextPlayerId].turn = true
		}
		return players
	}
	
	//This function will draw a number of cards and put them somewhere
	//This will update the deck in state and also return the deck for other uses
	async play(deck: deckType, from: string, to: string, num: number = 1) {
		let cards: cardType[] = []
		let deck_id: string = deck.deck_id
		//Draw the cards from the pile you get them from
		let drawCard: cardType[] = await api.draw(deck_id, from, num)
		//Add the cards to the pile you're playing to
		let addCard: boolean = await api.add(deck_id, to, drawCard)
		//Get the updated cards from the api, update state and return cards for future use
		deck = await api.update(deck_id, from, deck)
		deck = await api.update(deck_id, to, deck)
		this.setState({
			deck: deck,
			players: this.handleTurn(from)
		})
		return deck 
	}
	
	//This checks if a player has won or not
	async snap(currentPlayer: string) {
		let isReady: boolean = this.state.isReady
		let success: boolean = this.state.deck.success
		let players: playerType[] = this.state.players
		let currentPlayerId: number = players.findIndex(i => i.name == currentPlayer)
		let nextPlayerId: number = players.length - currentPlayerId
		let nextPlayer: string = players[nextPlayerId].name
		let winner: string = ""
		let cards: cardType[] = this.state.deck.piles[players[0].name].cards
		//Check if the game has been initiated and if 2 or more cards have been played
		if(isReady && success && cards.length >= 2) {
			//Get current and previous card
			let currentCard: string = cards[cards.length - 1].code.charAt(0) 
			let previousCard: string = cards[cards.length - 2].code.charAt(0)
			//Check if cards are the same number when snapped
			if(currentCard === previousCard) {
				//Set winner to current player and alert winner
				winner = currentPlayer
				alert(currentPlayer + " you fucking won!")
			} else {
				//Set winner to the other player, alert the loser and swap turns
				winner = nextPlayer
				alert("No snap")
				//This should potentially be grouped with the deck setting
				this.setState({
					players: this.handleTurn(currentPlayer)
				})
			}
			this.resetGame(winner)
		} else {
			alert("You can't snap yet")
		}
	}
	
	//Send the cards from the house back to the winner and return deck for other uses
	async resetGame(winner: string) {
		let deck: deckType = this.state.deck
		let from: string = this.state.players[0].name
		let num: number = this.state.deck.piles[from].cards.length
		return deck = await this.play(deck, from, winner, num)
	}
	
	//Mapped components to make display easier. They just take state and display as lists
	showCards(player: string) {
		let isReady: boolean = this.state.isReady
		if(isReady) {
			let playerPile: pileType = this.state.deck.piles[player]
			//Filter out to only show the last two items
			//Map the data to a card component
			let playerCards: ReactNode = playerPile.cards
				.filter(c => playerPile.cards.indexOf(c) == playerPile.cards.length -1)
				.map(c => <Card key={c.code.toString()} image={c.image} value={c.value} suit={c.suit} code={c.code}/>)
			return playerCards
		}
	}
                                
	showHand(typeOfPlayer: boolean) {
		let isReady: boolean = this.state.isReady
		if (isReady) {
			let players: playerType[] = this.state.players
			let deck: deckType = this.state.deck
			//Filter out players that aren't read only
			//Map players and get cards for that player
			let hand: ReactNode = players
				.filter(i => i.readOnly === typeOfPlayer)
				.map(i => 
					<Player 
						title={i.name} 
						key={i.id} 
						readOnly={i.readOnly} 
						turn={i.turn}
						theme={i.theme} 
						playCard={() => { this.play(deck, i.name, players[0].name, 1) }}
						snap={() => { this.snap(i.name) }}
					>
						{ (this.showCards(i.name) !== undefined) ? this.showCards(i.name) : <h3>No card</h3>  }
					</Player>
				)
			return hand
		}
	}

	render(): React.ReactNode {

		const ID: string = this.state.deck.deck_id
		const isReady: boolean = this.state.isReady
		const loadingText: string = "Loading..."
		const RO: boolean = true
		const W: boolean = false
			
		return (
			<div className="cell">
				{ isReady ? <Hero title={ID}/> : <Hero title={loadingText}/> }
				<PlayerWrapper title="This is the house">
					{ isReady ? this.showHand(RO) : <h3>{loadingText}</h3> }
				</PlayerWrapper>
				<PlayerWrapper title="These are players">
					{ isReady ? this.showHand(W) : <h3>{loadingText}</h3> }
				</PlayerWrapper>
			</div>
		)
	}
}
