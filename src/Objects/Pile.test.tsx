import * as deckService from './Deck'
import * as pileService from './Pile'
//We should probably mock this rather than using everything to test this
import { IDeck } from '../Utils/types'

let deck: IDeck;
// TODO - this gets as many decks as there are tests, would be nice to have a way to reset the deck...
// Currently not possible with the api we're using, maybe if I ever finish the Rust one I can add this
// Other option would be to either request a new deck for each test OR mock the api
beforeEach(async () => {
    deck = await deckService.create()
    expect(deck).toBeDefined()
})

it('should Create a new pile with attributes defined', async () => {
    const pileName = 'test'
    const updatedDeck = await deckService.newPile(deck, pileName)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    expect(pile.deck_id).toMatch(/([A-Za-z0-9]{12})/)
    expect(pile.name).toBe(pileName);
    expect(pile.cards).toBeDefined();
})

it('should Create a pile with a list of cards', async () => {
    const numberOfCards = 10
    const pileName = 'test'
    const cards = await deckService.drawCards(deck, numberOfCards)
    expect(cards).toHaveLength(10)
    const updatedDeck = await deckService.newPile(deck, pileName, cards)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    expect(pile.cards).toHaveLength(10)
})

it('should List cards in a pile', async () => {
    const numberOfCards = 10
    const pileName = 'test'
    const updatedDeck = await deckService.drawIntoPile(deck, pileName, numberOfCards)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined();
    const listed = await pileService.list(deck.deck_id, pile);
    expect(listed).toHaveLength(numberOfCards);
})

it('should Draw into an existing pile', async () => {
    const numberOfCards = 10
    const pileName = 'test'
    const updatedDeck = await deckService.newPile(deck, pileName)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    const drawIntoPileDeck = await deckService.drawIntoPile(deck, pileName, numberOfCards)
    expect(drawIntoPileDeck.piles[pileName].cards).toHaveLength(numberOfCards)
})

it('should Draw into a new pile', async () => {
    const numberOfCards = 10
    const pileName = 'test'
    const updatedDeck = await deckService.drawIntoPile(deck, pileName, numberOfCards)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    expect(pile.cards).toHaveLength(numberOfCards)
})

it('should Draw cards from a pile', async () => {
    const deckCards = 10
    const pileCards = 5
    const pileName = 'test'
    const updatedDeck = await deckService.drawIntoPile(deck, pileName, deckCards)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    const { cards } = await pileService.drawCards(deck.deck_id, pileCards, pile)
    expect(cards).toHaveLength(pileCards);
    expect(pile.cards).toHaveLength(pileCards);
    pile.cards.forEach(card => {
        expect(cards).not.toContain(card);
    })
})

it('should Draw cards from Top/Bottom', async () => {
    const initCards = 10
    const pileName = 'test'
    const updatedDeck = await deckService.drawIntoPile(deck, pileName, initCards)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    const topCard = pile.cards[pile.cards.length - 1]
    const bottomCard = pile.cards[0]

    const topPile = await pileService.drawCardFrom(deck.deck_id, pile, "top")
    expect(topPile.cards[0]).toEqual(topCard)
    expect(topPile.cards).toHaveLength(initCards - 1)
    expect(topPile.cards).not.toContain(topCard)

    const bottomPile = await pileService.drawCardFrom(deck.deck_id, pile, "bottom")
    expect(bottomPile.cards[0]).toEqual(bottomCard)
    expect(bottomPile.cards).toHaveLength(initCards - 2)
    expect(bottomPile.cards).not.toContain(bottomCard)
})

it('should Add cards to a pile', async () => {
    const numberOfCards = 10
    const pileName = 'test'
    const updatedDeck = await deckService.newPile(deck, pileName)
    const pile = updatedDeck.piles[pileName]
    expect(pile).toBeDefined()
    const cards = await deckService.drawCards(deck, numberOfCards)
    const updatedPile = await pileService.add(deck.deck_id, pile, cards)
    expect(updatedPile.cards).toHaveLength(numberOfCards)
})
