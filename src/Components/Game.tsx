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
	cardInit: number
	players: playerType[]
}

export default class Game extends Component<Props, State> {
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
			cardInit: 26,
			players: [
				{ id: 0, name: 'house', readOnly: true, theme: "house", turn: false },
				{ id: 1, name: 'p1', readOnly: false, theme: "p1", turn: false },
				{ id: 2, name: 'p2', readOnly: false, theme: "p2", turn: false }
			]
		}
		//Binding function to class
		this.initialiseDeck = this.initialiseDeck.bind(this)
		this.getOtherPlayer = this.getOtherPlayer.bind(this)
		this.handleFailure = this.handleFailure.bind(this)
		this.handleSuccess = this.handleSuccess.bind(this)
		this.handleTurn = this.handleTurn.bind(this)
		this.play = this.play.bind(this)
		this.showCards = this.showCards.bind(this)
		this.showHand = this.showHand.bind(this)
		this.resetGame = this.resetGame.bind(this)
		this.snap = this.snap.bind(this)
	}

	//Initialises the deck and adds all cards to the base pile
	async initialiseDeck() {
		const { cardInit, players } = this.state
		const shuffled: boolean = true
		let deck = this.state.deck
		//Get the deck and id
		deck.deck_id = await api.newDeck(shuffled)
		//Save the deck id locally
		let deck_id: string = deck.deck_id
		//Draw all cards into nowhere
		const drawAllCards = await api.draw(deck_id, "deck", 52)
		await api.add(deck_id, players[0].name, drawAllCards)
		//Update the house pile from the api
		deck = await api.update(deck_id, players[0].name, deck)
		//Add initial cards to each pile and create them
		deck = await this.play(deck, players[0].name, players[1].name, cardInit)
		deck = await this.play(deck, players[0].name, players[2].name, cardInit)
		//Update the deck status, update state and return the deck for further use
		deck.success = true
		players[1].turn = true
		this.setState({ deck, players })
		return deck
	}

	//Get the new deck and then set the make the game ready
	async componentDidMount() {
		const deck = await this.initialiseDeck()

		if (deck.success) {
			this.setState({ isReady: true })
		} else {
			this.setState({ isReady: false })
		}
	}

	getOtherPlayer(currentPlayer: string) {
		const { players } = this.state
		let currentPlayerId = players.findIndex(i => i.name == currentPlayer)
		let nextPlayer = players[players.length - currentPlayerId].name
		return nextPlayer
	}

	handleFailure(winner: string, loser: string, message: string) {
		alert(message)
		this.setState({ players: this.handleTurn(loser) })
		this.resetGame(loser)
	}

	handleSuccess(winner: string, loser: string, message: string) {
		alert(winner + message)
		this.resetGame(winner)
	}

	//Takes the current player and changes to the next valid player
	handleTurn(currentPlayer: string) {
		const { deck, isReady, players } = this.state
		const success = deck.success
		const currentPlayerId: number = players.findIndex(i => i.name == currentPlayer)
		const nextPlayerId: number = players.length - currentPlayerId //Changes player ignoring 0
		//Check that the deck is prepped and it is the players turn
		if (isReady && success && players[currentPlayerId].turn) {
			players[currentPlayerId].turn = false
			players[nextPlayerId].turn = true
		}
		return players
	}

	//This function will draw a number of cards and put them somewhere
	//This will update the deck in state and also return the deck for other uses
	async play(deck: deckType, from: string, to: string, num: number = 1) {
		const { deck_id } = deck
		const drawCard = await api.draw(deck_id, from, num)
		await api.add(deck_id, to, drawCard)
		//Get the updated cards from the api, update state and return cards for future use
		deck = await api.update(deck_id, from, deck)
		deck = await api.update(deck_id, to, deck)
		this.setState({ deck, players: this.handleTurn(from) })
		return deck
	}

	//This checks if a player has won or not
	async snap(currentPlayer: string) {
		const { deck, isReady, players } = this.state
		const { success } = deck
		const nextPlayer = this.getOtherPlayer(currentPlayer)
		const cards = deck.piles[players[0].name].cards
		//Check if the game has been initiated and if 2 or more cards have been played
		if (isReady && success && cards.length >= 2) {
			const currentCard = cards[cards.length - 1].code.charAt(0)
			const previousCard = cards[cards.length - 2].code.charAt(0)
			//Check if cards are the same number when snapped
			if (currentCard === previousCard) {
				this.handleSuccess(currentPlayer, nextPlayer, ", you fucking won")
			} else {
				this.handleFailure(nextPlayer, currentPlayer, "No snap!")
			}
		} else if (isReady && success && cards.length === 52) {
			alert("You won all of it!")
			this.initialiseDeck()
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
		const { isReady } = this.state

		if (!isReady) {
			return null
		}

		const playerPile: pileType = this.state.deck.piles[player]
		//Filter out to only show the last item
		return playerPile.cards
			.filter(c => playerPile.cards.indexOf(c) == playerPile.cards.length - 1)
			.map(c => <Card key={c.code.toString()} image={c.image} value={c.value} suit={c.suit} code={c.code} />)
	}

	showHand(typeOfPlayer: boolean): ReactNode {
		const { isReady } = this.state

		if (!isReady) {
			return null
		}

		const { deck, players } = this.state
		//Filter out players that aren't read only
		return players
			.filter(i => i.readOnly === typeOfPlayer)
			.map(i =>
				<Player
					title={i.name}
					key={i.id}
					readOnly={i.readOnly}
					turn={i.turn}
					theme={i.theme}
					playCard={() => { this.play(deck, i.name, players[0].name, 1) }}
					snap={() => { this.snap(i.name) }} >
					{this.showCards(i.name)}
				</Player>
			)
	}

	render(): React.ReactNode {
		const { deck, isReady } = this.state
		const loadingText: string = "Loading..."

		return (
			<div className="cell">
				{isReady ? <Hero title={deck.deck_id} /> : <Hero title={loadingText} />}
				<PlayerWrapper title="This is the house">
					{isReady ? this.showHand(true) : <h3>{loadingText}</h3>}
				</PlayerWrapper>
				<PlayerWrapper title="These are players">
					{isReady ? this.showHand(false) : <h3>{loadingText}</h3>}
				</PlayerWrapper>
			</div>
		)
	}
}
