import * as api from '../api'
import Deck, { } from './Deck';
import Pile, { } from './Pile';
//We should probably mock this rather than using everything to test this
import Card from './Card';

var deck: Deck | undefined;

// TODO - this gets as many decks as there are tests, would be nice to have a way to reset the deck...
// Currently not possible with the api we're using, maybe if I ever finish the Rust one I can add this
// Other option would be to either request a new deck for each test OR mock the api
beforeEach(async () => {
    deck = await api.getDeck({ shuffled: false });
    expect(deck).toBeDefined();
})

it('should Create a new pile with attributes defined', async () => {
    if (deck) {
        let pile = await deck.newPile("test");
        expect(pile).toBeDefined();
        expect(pile.deck_id).toMatch(/([A-Za-z0-9]{12})/);
        expect(pile.name).toBe("test");
        expect(pile.cards).toBeDefined();
    }
});

it('should shuffle the pile', async () => {
  if (deck) {
    let pile = await deck.newPile("test");
    expect(pile).toBeDefined();
    let result = await pile.shuffle();
    expect(result).toBe(true);
  }
})

it('should Create a pile with a list of cards', async () => {
    if (deck) {
        let cards = await deck.drawCards(10);
        expect(cards).toHaveLength(10);
        if (cards) {
            let pile = await deck.newPile("test", cards);
            expect(pile).toBeDefined();
            if (pile) {
                expect(pile.cards).toHaveLength(10);
            }
        }
    }
});

it('should List cards in a pile', async () => {
    if (deck) {
        let pile = await deck.drawIntoPile("test", 10);
        expect(pile).toBeDefined();
        if (pile) {
            let listed = await pile.list();
            expect(listed).toHaveLength(10);
        }
    }
});

it('should Draw into an existing pile', async () => {
    if (deck) {
        let pile = await deck.newPile("test");
        expect(pile).toBeDefined();
        if (pile) {
            await deck.drawIntoPile("test", 10);
            expect(pile.cards).toHaveLength(10);
        }
    }
});

it('should Draw into a new pile', async () => {
    if (deck) {
        let pile = await deck.drawIntoPile("test", 10);
        expect(pile).toBeDefined()
        if (pile) {
            expect(pile.cards).toHaveLength(10);
        }
    }
});

it('should Draw cards from a pile', async () => {
    if (deck) {
        let pile = await deck.drawIntoPile("test", 10);
        expect(pile).toBeDefined();
        if (pile) {
            let cards = await pile.drawCards(5);
            expect(cards).toHaveLength(5);
            expect(pile.cards).toHaveLength(5);
            pile.cards.forEach(card => {
                expect(cards).not.toContain(card);
            });
        }
    }
});

it('should Draw cards from Top/Bottom', async () => {
    if (deck) {
        let pile = await deck.drawIntoPile("test", 10);
        expect(pile).toBeDefined();
        if (pile) {
            let topcard = pile.cards[pile.remaining - 1];
            let bottomcard = pile.cards[0];

            let card = await pile.drawCardFrom("top");
            expect(card).toEqual(topcard);
            expect(pile.cards).toHaveLength(9);
            expect(pile.cards).not.toContain(topcard);

            card = await pile.drawCardFrom("bottom")
            expect(card).toEqual(bottomcard);
            expect(pile.cards).toHaveLength(8);
            expect(pile.cards).not.toContain(bottomcard);
        }
    }
});

it('should Add cards to a pile', async () => {
    if (deck) {
        let pile = await deck.newPile("test");
        expect(pile).toBeDefined()
        if (pile) {
            let cards = await deck.drawCards(10);
            if (cards) {
                await pile.add(cards);
                expect(pile.cards).toHaveLength(10);
            }
        }
    }
});