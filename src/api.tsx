import axios from "axios";
import Deck from "./Objects/Deck";

import Card, { CardData } from "./Objects/Card"

export type DrawFromType = 'top' | 'bottom'

export type CardSuitCode = 'S' | 'D' | 'C' | 'H'
export enum CardSuit {
  SPADES = 'Spades',
  DIAMONDS = 'Diamonds',
  CLUBS = 'Clubs',
  HEARTS = 'Hearts'
}

export const CardSuitMap: { [key in CardSuitCode]: CardSuit } = {
  'S': CardSuit.SPADES,
  'D': CardSuit.DIAMONDS,
  'C': CardSuit.CLUBS,
  'H': CardSuit.HEARTS
}

export type CardValueCode = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'J' | 'Q' | 'K'
export enum CardValue { 
  ACE = 'Ace', 
  TWO = '2',
  THREE = '3', 
  FOUR = '4',
  FIVE = '5', 
  SIX = '6',
  SEVEN = '7', 
  EIGHT = '8',
  NINE = '9', 
  TEN = '10', 
  JACK = 'Jack', 
  QUEEN = 'Queen',
  KING = 'King' 
}
export const CardValueMap: { [key in CardValueCode]: CardValue } = {
  'A': CardValue.ACE,
  '2': CardValue.TWO,
  '3': CardValue.THREE,
  '4': CardValue.FOUR,
  '5': CardValue.FIVE,
  '6': CardValue.SIX,
  '7': CardValue.SEVEN,
  '8': CardValue.EIGHT,
  '9': CardValue.NINE,
  '0': CardValue.TEN,
  'J': CardValue.JACK,
  'Q': CardValue.QUEEN,
  'K': CardValue.KING,
}

export type CardCode = 'AS' | '2S' | '3S' | '4S' | '5S' | '6S' | '7S' | '8S' | '9S' | '0S' | 'JS' | 'QS' | 'KS' |
  'AD' | '2D' | '3D' | '4D' | '5D' | '6D' | '7D' | '8D' | '9D' | '0D' | 'JD' | 'QD' | 'KD' |
  'AC' | '2C' | '3C' | '4C' | '5C' | '6C' | '7C' | '8C' | '9C' | '0C' | 'JC' | 'QC' | 'KC' |
  'AH' | '2H' | '3H' | '4H' | '5H' | '6H' | '7H' | '8H' | '9H' | '0H' | 'JH' | 'QH' | 'KH'

export type RuleSet = {
  AceHigh: boolean
  PictureCardValue: number
}

export const defaultRuleSet: RuleSet = {
  AceHigh: true,
  PictureCardValue: 10
}

export const url = "https://deckofcardsapi.com/api/"

export async function getDeck({ deck_id = "new", shuffled = true } = {}) {
  return axios.get(url + "deck/" + deck_id + "/" + (shuffled ? "shuffle/" : ""))
    .then(
      response => {
        return response.data.success ? new Deck(response.data) : undefined
      }
    )
}

export function getCardValue(card: Card, rules: RuleSet = defaultRuleSet): number {
  if (card.value === CardValue.ACE) {
    return rules.AceHigh ? rules.PictureCardValue + 1 : 1
  }
  else if (card.isPictureCard) {
    return rules.PictureCardValue
  }
  else {
    return parseInt(card.value)
  }
}

export function getCardsFromData(cards: CardData[]) {
  let result = new Array<Card>()
  cards.forEach(card => {
    result.push(new Card(card))
  });
  return result
}

export function getCardKeys(cards: Card[] = []): string {
  let keys = ""
  if (cards.length > 0) {
    cards.forEach(currentItem => {
      keys += `${currentItem.code},`
    });
  }
  return keys
}