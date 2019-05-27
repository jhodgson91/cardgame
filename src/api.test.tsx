import axios from "axios"
import {deckType, playerType, pileType, cardType} from "./Components/Game"
import * as api from './api';

var deckNotShuffled = ""
var deckShuffled = ""
var testDeckId = ""
var deckDrawOneCard = ""
var deckAddOneBanana = ""
var deckPileList = ""

beforeAll(async () => {
	deckNotShuffled = await api.newDeck(false)
	deckShuffled = await api.newDeck(true)
})


it("a new deck request returns a deck id when not shuffled", () => {
	expect(typeof deckNotShuffled).toBe("string")
	expect(deckNotShuffled).toMatch(/([A-Za-z0-9]{12})/)
})

it("a new deck request returns a deck id when shuffled", () => {
		expect(typeof deckShuffled).toBe("string")
	expect(deckShuffled).toMatch(/([A-Za-z0-9]{12})/)
})
