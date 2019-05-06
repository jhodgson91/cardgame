import React, { Component, ReactNode } from 'react'
import './Main.scss'
import axios from 'axios'
import Hero from './Hero'
import PlayerWrapper from './PlayerWrapper'
import Player from './Player'
import Card from './Card'

//Base api URL
const baseUrl: string = "https://deckofcardsapi.com/api/"

//api wrapper function
async function api(url: string) {
	let res = await axios.get(url)
	return res.data.success ? res.data : console.log("error", res.data)
}

//Define props types
export interface Props {

}

//Types for the state
interface deckType {
	success: boolean,
	deck_id: string,
	shuffled: boolean,
	remaining: number,
	piles: {
		[name: string]: pileType
	}
}

interface playerType {
	id: number,
	name: string,
	readOnly: boolean,
	theme: string
}

interface pileType {
	deck_id: string,
	name: string,
	cards: cardType[]
}

interface cardType {
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
	url: string
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
			],
			url: baseUrl
		}
    //Binding function to class
    this.initialiseDeck = this.initialiseDeck.bind(this)
    this.play = this.play.bind(this)
    this.showCards = this.showCards.bind(this)
    this.showHand = this.showHand.bind(this)
    
  }

	//Initialises the deck and adds all cards to the base pile
  async initialiseDeck() {
		let deck: deckType = this.state.deck
		let deck_id: string = "new"    
		let players: playerType[] = this.state.players
		let url: string = this.state.url
		//Request deck from api
		let createDeck = await api(`${url}deck/${deck_id}/shuffle/`)
		//Update the URL with the deck id
		url = `${url}deck/${createDeck.deck_id}`
		//Draw all cards into the house pile
		let drawCards = await api(`${url}/draw/?count=52`)
		//Copy cards locally
		let cards: cardType[] = drawCards.cards
		//Convert card array to list for API use
		let cardList: string = cards.map(card => card.code).toString()
		//Add cards into the house
		let addCards = await api(`${url}/pile/${players[0].name}/add/?cards=${cardList}`)
		//List out pile cards
		let getPile = addCards.success ? await api(`${url}/pile/${players[0].name}/list/`) : console.log("initialise deck error", addCards)
		//Copy new deck data to deck
		deck.success = createDeck.success
		deck.deck_id = createDeck.deck_id
		deck.shuffled = createDeck.shuffled
		deck.remaining = createDeck.remaining
		//Copy new pile to deck
		deck.piles = getPile.piles
		//Create player one
		let cardInit: number = this.state.cardInit
		let player0: string = this.state.players[0].name
		let player1: string = this.state.players[1].name
		let player2: string = this.state.players[2].name
		let deckUpdate1: deckType | undefined = await this.play(player0, player1, cardInit)
		deck = deckUpdate1
		let deckUpdate2: deckType | undefined = await this.play(player0, player2, cardInit)
		deck = deckUpdate2
		//Update the url for other functions
		this.setState({
			url: url
		})
		//Return deck with deck data plus the house pile ready to use
		return deck
	}
  
	//This function will draw a number of cards and put them somewhere
	//This will update the deck in state and also return the deck for other uses
	async play(from: string, to: string, num: number = 1) {
		let cards: cardType[] = []
		let deck: deckType = this.state.deck
		let url: string = baseUrl
		url = `${url}deck/${deck.deck_id}`
		//Draw random cards from a pile
		let drawCard = await api(`${url}/pile/${from}/draw/?count=${num}`)
		//Copy cards locally
		let copyCard: cardType[] = drawCard.success ? drawCard.cards  : console.log("play draw error", drawCard)
		//Convert cards to string
		let cardList: string = copyCard.map(card => card.code).toString()
		//Add the cards to the new pile
		let addCard = await api(`${url}/pile/${to}/add/?cards=${cardList}`)
		//Update from pile
		let updateFromPile = addCard.success ? await api(`${url}/pile/${from}/list/`) : console.log(addCard)
		deck.piles[from] = updateFromPile.success ? updateFromPile.piles[from] : console.log(updateFromPile)
		//Update to pile
		let updateToPile = addCard.success ? await api(`${url}/pile/${to}/list/`) : console.log(addCard)
		deck.piles[to] = updateToPile.success ?  updateToPile.piles[to] : console.log(updateToPile)
		//Update the state with the amended deck
		return deck
	} 
  
	//TODO: Make sure that deck can't be undefined
	async componentDidMount() {
		//Initiate the deck
		let deck: deckType = await this.initialiseDeck()
		if (deck.success) {
			this.setState({
				isReady: true,
				deck: deck
			})
		}
	}
  
	//Mapped components to make display easier. They just take state and display as lists
	showCards(player: string) {
		let isReady: boolean = this.state.isReady
		if(isReady) {
			let playerPile = this.state.deck.piles[player]
			if(playerPile != undefined) {
				let playerCards: ReactNode = playerPile.cards.map(c => <Card key={c.code.toString()} image={c.image} value={c.value} suit={c.suit} code={c.code}/>)
				return playerCards
			} else {
				return undefined
			}
		}
	}
                                
	showHand(typeOfPlayer: boolean) {
		let isReady: boolean = this.state.isReady
		if (isReady) {
			let players: playerType[] = this.state.players
			let hand: ReactNode = players
				.filter(i => i.readOnly === typeOfPlayer)
				.map(i => 
					<Player title={i.name} key={i.id} readOnly={i.readOnly} theme={i.theme} playCard={() => { console.log("click") }}>
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
