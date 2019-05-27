import axios from "axios"
import {deckType, playerType, pileType, cardType} from "./Components/Game"
import * as api from './api';

var deckNotShuffled = ""
var deckShuffled = ""
var testDeckId = ""
var deckDrawOneCard = {"remaining": 51, "cards": [{"code": "0S", "suit": "SPADES", "value": "10", "images": {"png": "https://deckofcardsapi.com/static/img/0S.png", "svg": "https://deckofcardsapi.com/static/img/0S.svg"}, "image": "https://deckofcardsapi.com/static/img/0S.png"}], "deck_id": "5031e8fqc921", "success": true}
var deckAddOneBanana = {"piles": {"banana": {"remaining": 1}}, "remaining": 51, "deck_id": "5031e8fqc921", "success": true}
var deckPileList = {"piles": {"banana": {"remaining": 1, "cards": [{"code": "0S", "suit": "SPADES", "value": "10", "images": {"png": "https://deckofcardsapi.com/static/img/0S.png", "svg": "https://deckofcardsapi.com/static/img/0S.svg"}, "image": "https://deckofcardsapi.com/static/img/0S.png"}]}}, "remaining": 51, "deck_id": "5031e8fqc921", "success": true}

beforeAll(async () => {
	try {
		deckNotShuffled = await api.newDeck(false)
		deckShuffled = await api.newDeck(true).then(
			deckDrawOneCard = await api.draw(deckNotShuffled, "banana", 1)
		)
	} catch(err) {
		alert(err)
	}
	
	
	//deckAddOneBanana = await api.add(deckNotShuffled.deck_id, "banana", "AS")
	//deckPileList = await api.update(deckNotShuffled.deck_id, "banana", "deck")
})


//it("handles and error and returns undefined", () => {
//	expect(testHandleError).toBeUndefined;
//})

it("a new deck request returns a deck id when not shuffled", () => {
	expect(typeof deckNotShuffled).toBe("string")
	expect(deckNotShuffled).toMatch(/([A-Za-z0-9]{12})/)
})

it("a new deck request returns a deck id when shuffled", () => {
		expect(typeof deckShuffled).toBe("string")
	expect(deckShuffled).toMatch(/([A-Za-z0-9]{12})/)
})

it("returns an array of the number of requested card", () => {
	
	expect(deckDrawOneCard).toBe("Banana")
})


/*

it('returns a valid deck when shuffled', () => {
    expect(deckTrue).toBeDefined();
    expect(deckTrue.data.success).toBeTruthy();
    expect(deckTrue.data.deck_id).toMatch(/([A-Za-z0-9]{12})/);
    expect(deckTrue.id).toMatch(/([A-Za-z0-9]{12})/);
    expect(deckTrue.data.shuffled).toBeTruthy();
    expect(deckTrue.shuffled).toBeTruthy();
    expect(deckTrue.data.remaining).toBe(52);
    expect(deckTrue.remaining).toBe(52);
    expect(deckTrue.data.piles).toMatchObject({});
    expect(deckTrue.piles).toMatchObject({});
})

it('returns a valid deck when not shuffled', () => {
    expect(deckFalse).toBeDefined();
    expect(deckFalse.data.success).toBeTruthy();
    expect(deckFalse.data.deck_id).toMatch(/([A-Za-z0-9]{12})/);
    expect(deckFalse.data.shuffled).toBeFalsy();
    expect(deckFalse.data.remaining).toBe(52);
    expect(deckFalse.data.piles).toMatchObject({});
})

//Base api URL
const baseUrl: string = "https://deckofcardsapi.com/api/"

//Generic handle error function, returns undefined
export function handleError(desc: string, err: any) {
	console.log(desc, err)
	return undefined
}

//Api wrapper function, return data or handle error
export async function api(url: string) {
	try {
		let res = await axios.get(url)
		return res.data
	} catch(err) {
		handleError("error", err)
	}
}

//Request a new deck from the api, returns deck or handle error
export async function newDeck(shuffled: boolean) {
	try {
		//Request a shuffled deck or an unshuffled deck
		let res = shuffled ? await api(`${baseUrl}deck/new/shuffle`) : await api(`${baseUrl}deck/new/`) 
		//Return the new deck if success or handle error
		let deck_id: string = res.deck_id ? res.deck_id : "error"
		return deck_id
	} catch(err) {
		handleError("newDeck error", err)
	}
}

//draws from a pile and returns the cards or handle error
export async function draw(deck_id: string, location:string, num: number) {
	try {
		//Check if draw from deck or pile
		let res = location === "deck" ? await api(`${baseUrl}deck/${deck_id}/draw/?count=${num}`) : 
			await api(`${baseUrl}deck/${deck_id}/pile/${location}/draw/?count=${num}`)
		//Check for success and either return cards or handle error
		return res.cards
	} catch(err) {
		handleError("draw error", err)
	}
}

//Takes an array of card types, converts them to a string and the adds the cards 
//to a new pile and returns true or handle error
export async function add(deck_id: string, location: string, cards: cardType[] ) {
	try {
		//Convert cards to string
		let cardList: string = cards.map(card => card.code).toString()
		//Add the cards to the new pile
		let res = await api(`${baseUrl}deck/${deck_id}/pile/${location}/add/?cards=${cardList}`)
		//Return the true or handle error
		return res.success
	} catch(err) {
		handleError("add card error", err)
	}
}

//Updates one pile from the api or handles error
export async function update(deck_id: string, location: string, deck: deckType) {
	try {
		//Request pile update from api
		let res = await api(`${baseUrl}deck/${deck_id}/pile/${location}/list/`)
		//Copy updated pile to local deck or handle error
		deck.piles[location] = res.piles[location]
		return deck
	} catch(err) {
		handleError("update error", err)
	}
}
*/