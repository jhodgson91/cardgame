import * as api from '../api';
import Deck from './Deck';
import mockDeck from './Deck';

var deck: Deck | undefined;

jest.mock('./Deck');

beforeEach(() => {
  Deck.mockClear();
  mockDeck.mockClear();
});

beforeAll(async () => {
    deck = await api.getDeck({ shuffled: false });
    expect(deck).toBeDefined();
})

// Can we get a deck at all?
it('should Create a deck', () => {
    expect(deck).toBeDefined();
    if (deck) {
        expect(deck.id).toBeDefined();
        expect(deck.remaining).toBe(52);
        expect(deck.shuffled).toBe(false);
        expect(deck.piles).toEqual({});
        expect(deck.url).toBeDefined();
    }

});

it('should Get an existing deck', async () => {
    if (deck) {
        let deckCopy = await api.getDeck({ deck_id: deck.id });
        expect(deckCopy).toBeDefined();
    }
});

it('should Draw 10 cards from a Deck', async () => {
    if (deck) {
        let cards = await deck.drawCards(10);
        expect(cards).toHaveLength(10);
    }
});

it('should error if too many cards are drawn', async () => {
    if(deck) {
        //Currently using the same deck as the test above so needs 42 cards to max out the deck
        let drawTooMany = await deck.drawCards(42);
        expect(drawTooMany).toHaveLength(42);
        if(drawTooMany != undefined) {
            let error = await deck.drawCards(1);  // Always make the API call 
            expect(error).toBeDefined();          // Expect that the call itself was a success
            if (error) { // I don't know if the expect will bomb out if error wasn't defined, if it does this if can go away
                expect(error.success).toBe(false);    // Expect that the call returned success==false
            }
        }
    }
})

it('should Shuffle a deck', async () => {
    if (deck) {
        expect(deck.shuffled).toBe(false);
        await deck.shuffle();
        expect(deck.shuffled).toBe(true);
    }
});