import axios from "axios";
import Deck from "./Objects/Deck";
import * as api from './api';

var deck: Deck | undefined;
var cards: Array<any> = [
      {
          "image": "https://deckofcardsapi.com/static/img/KH.png",
          "value": "KING",
          "suit": "HEARTS",
          "code": "KH"
      },
      {
          "image": "https://deckofcardsapi.com/static/img/8C.png",
          "value": "8",
          "suit": "CLUBS",
          "code": "8C"
      }
  ];

beforeEach(async () => {
    deck = await api.getDeck();
    expect(deck).toBeDefined();
})

it('returns a valid deck', () => {
    expect(deck.data.success).toBeTruthy();
    expect(deck.data.deck_id).toMatch(/([A-Za-z0-9]{12})/);
    expect(deck.data.shuffled).toBeTruthy();
    expect(deck.data.remaining).toBe(52);
    expect(deck.data.piles).toMatchObject({});
})

it('returns card keys', () => {
    expect(api.getCardKeys(cards)).toBe('KH,8C');
})
