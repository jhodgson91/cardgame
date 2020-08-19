import axios from "axios"
import {deckType, cardType} from "./Components/Game"

//Base api URL
const baseUrl: string = "https://deckofcardsapi.com/api/"

//Generic handle error function, returns undefined
export async function handleError(desc: string, err: any) {
	console.log(desc, err)
}

//Api wrapper function, return data or handle error
export async function getUrl(url: string) {
	let res = await axios.get(url)
	return res.data
}

//Request a new deck from the api, returns deck or handle error
export async function newDeck(shuffled: boolean): Promise<string> {
	//Request a shuffled deck or an un-shuffled deck
	let res = shuffled ? await getUrl(`${baseUrl}deck/new/shuffle/`) : await getUrl(`${baseUrl}deck/new/`) 
	//Return the new deck if success or handle error
	return res.deck_id 
}

//draws from a pile and returns the cards or handle error
export async function draw(deck_id: string, location:string, num: number): Promise<cardType[]> {
	//Check if draw from deck or pile
	let res 
	
	if(location === "deck") {
		res = await getUrl(`${baseUrl}deck/${deck_id}/draw/?count=${num}`)
	} else {
		res = await getUrl(`${baseUrl}deck/${deck_id}/pile/${location}/draw/?count=${num}`)
	}

	return res.cards
}

//Takes an array of card types, converts them to a string and the adds the cards 
//to a new pile and returns true or handle error
export async function add(deck_id: string, location: string, cards: cardType[]): Promise<boolean> {
	//Convert cards to string
	let cardList: string = cards.map(card => card.code).toString()
	//Add the cards to the new pile
	let res = await getUrl(`${baseUrl}deck/${deck_id}/pile/${location}/add/?cards=${cardList}`)
	
	return res.success
}

//Updates one pile from the api or handles error
export async function update(deck_id: string, location: string, deck: deckType): Promise<deckType> {
	//Request pile update from api
	let res = await getUrl(`${baseUrl}deck/${deck_id}/pile/${location}/list/`)
	//Copy updated pile to local deck or handle error
	deck.piles[location] = res.piles[location]
	
	return deck
}
