import * as deckService from './Deck'
import { IDeck } from '../Utils/types'

let deck: IDeck

//TODO: Finish off deck mocks and swap all API calls

//jest.mock('./Deck');

//beforeEach(() => {
//  Deck.mockClear();
//  mockDeck.mockClear();
//});

beforeAll(async () => {
    deck = await deckService.create()
    expect(deck).toBeDefined()
})

it('should Get an existing deck', async () => {
    const deckCopy = await deckService.getDeck(deck.deck_id)
    expect(deckCopy).toBeDefined()
});

it('should Draw 10 cards from a Deck', async () => {
    const numberOfCards = 10
    const cards = await deckService.drawCards(deck, numberOfCards)
    expect(cards).toHaveLength(numberOfCards)
});

it('should error if too many cards are drawn', async () => {
    const lotsOfCards = 42
    const oneTooManyCards = 1
    //Currently using the same deck as the test above so needs 42 cards to max out the deck
    const drawTooMany = await deckService.drawCards(deck, lotsOfCards)
    expect(drawTooMany).toHaveLength(lotsOfCards)
    const error = await deckService.drawCards(deck, oneTooManyCards) // Always make the API call 
    expect(error).toBeDefined() // Expect that the call itself was a success
    // I don't know if the expect will bomb out if error wasn't defined, if it does this if can go away
    expect(error).toBe(false)    // Expect that the call returned success==false
})
