import axios from "axios";
import Deck from "./Objects/Deck";
import * as api from './api';

var deckTrue: Deck | undefined;
var deckFalse: Deck | undefined;

beforeEach(async () => {
    deckTrue = await api.getDeck();
    deckFalse = await api.getDeck({ shuffled: false });
})

it('returns a valid deck when shuffled', () => {
    expect(deckTrue).toBeDefined();
    if (deckTrue != undefined) {
        expect(deckTrue.data.success).toBeTruthy();
        expect(deckTrue.data.deck_id).toMatch(/([A-Za-z0-9]{12})/);
        expect(deckTrue.id).toMatch(/([A-Za-z0-9]{12})/);
        expect(deckTrue.data.shuffled).toBeTruthy();
        expect(deckTrue.shuffled).toBeTruthy();
        expect(deckTrue.data.remaining).toBe(52);
        expect(deckTrue.remaining).toBe(52);
        expect(deckTrue.data.piles).toMatchObject({});
        expect(deckTrue.piles).toMatchObject({});
    }
})

it('returns a valid deck when not shuffled', () => {
    expect(deckFalse).toBeDefined();
    if (deckFalse != undefined) {
        expect(deckFalse.data.success).toBeTruthy();
        expect(deckFalse.data.deck_id).toMatch(/([A-Za-z0-9]{12})/);
        expect(deckFalse.data.shuffled).toBeFalsy();
        expect(deckFalse.data.remaining).toBe(52);
        expect(deckFalse.data.piles).toMatchObject({});
    }
})