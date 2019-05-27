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
	theme: string
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
				{ id: 0, name: 'house', readOnly: true, theme: "house"},
				{ id: 1, name: 'p1', readOnly: false, theme: "p1"},
				{ id: 2, name: 'p2', readOnly: false, theme: "p2"}
			]
		}
    //Binding function to class
    this.initialiseDeck = this.initialiseDeck.bind(this)
    this.play = this.play.bind(this)
    this.showCards = this.showCards.bind(this)
    this.showHand = this.showHand.bind(this)
    
  }

	//Initialises the deck and adds all cards to the base pile
  async initialiseDeck() {
		let cardInit: number = this.state.cardInit
		let deck: deckType = this.state.deck    		
		let players: playerType[] = this.state.players
		let shuffled: boolean = true
		deck.deck_id = await api.newDeck(shuffled)
		let deck_id = deck.deck_id
		let drawAllCards: cardType[] = await api.draw(deck_id, "deck", 52)
		let createHousePile: boolean = await api.add(deck_id, players[0].name, drawAllCards)
		deck = await api.update(deck_id, players[0].name, deck)
		deck = await this.play(deck, players[0].name, players[1].name, cardInit)
		deck = await this.play(deck, players[0].name, players[2].name, cardInit)
		deck.success = true
		this.setState({
				deck: deck
		})
		return deck
	}
  
	//This function will draw a number of cards and put them somewhere
	//This will update the deck in state and also return the deck for other uses
	async play(deck: deckType, from: string, to: string, num: number = 1) {
		let cards: cardType[] = []
		let deck_id: string = deck.deck_id
		let drawCard: cardType[] = await api.draw(deck_id, from, num)
		let addCard: boolean = await api.add(deck_id, to, drawCard)
		deck = await api.update(deck_id, from, deck)
		deck = await api.update(deck_id, to, deck)
		this.setState({
			deck: deck
		})
		return deck
	} 
  
	//TODO: Make sure that deck can't be undefined
	async componentDidMount() {
		//Initiate the deck
		let deck: deckType = await this.initialiseDeck()
		if (deck.success) {
			this.setState({
				isReady: true
			})
		}
	}
  
	//Mapped components to make display easier. They just take state and display as lists
	showCards(player: string) {
		let isReady: boolean = this.state.isReady
		if(isReady) {
			let playerPile = this.state.deck.piles[player]
			let playerCards: ReactNode = playerPile.cards.map(c => <Card key={c.code.toString()} image={c.image} value={c.value} suit={c.suit} code={c.code}/>)
			return playerCards
		}
	}
                                
	showHand(typeOfPlayer: boolean) {
		let isReady: boolean = this.state.isReady
		if (isReady) {
			let players: playerType[] = this.state.players
			let deck: deckType = this.state.deck
			let hand: ReactNode = players
				.filter(i => i.readOnly === typeOfPlayer)
				.map(i => 
					<Player title={i.name} key={i.id} readOnly={i.readOnly} theme={i.theme} playCard={() => { this.play(deck, i.name, players[0].name, 1) }}>
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
		const largeWidth: number = 12
		const RO: boolean = true
		const W: boolean = false
			
		return (
			<div className="cell">
				{ isReady ? <Hero title={ID}/> : <Hero title={loadingText}/> }
				<PlayerWrapper title="This is the house" grid={largeWidth}>
					{ isReady ? this.showHand(RO) : <h3>{loadingText}</h3> }
				</PlayerWrapper>
				<PlayerWrapper title="These are players" grid={largeWidth}>
					{ isReady ? this.showHand(W) : <h3>{loadingText}</h3> }
				</PlayerWrapper>
			</div>
		)
	}
}
