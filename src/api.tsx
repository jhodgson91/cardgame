import axios from "axios";
import Deck from "./Objects/Deck";

import Card from "./Objects/Card"

/*
This stuff is a possible option for limiting arguments to the draw function
It kind of sucks though so I'd rather find an alternative
https://stackoverflow.com/questions/45547900/introspection-on-custom-typescript-type

function stringLiteralArray<T extends string>(...args: T[]): T[] {
  return args;
}

const cardLocation = stringLiteralArray('top', 'bottom'); // ('left'|'right')[]
const cardCodes = stringLiteralArray(
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH'
)

export type CardLocation = (typeof cardLocation)[number]; // 'left' | 'right'
export type CardCode = (typeof cardCodes)[number]

export function isCardLocation(x: any): x is CardLocation {
  return cardLocation.includes(x); // needs es2016 at least, or implement yourself
}

export function isCardCode(x: any): x is CardCode {
  return cardCodes.includes(x)
}
*/

export const api = "https://deckofcardsapi.com/api/"

export async function getDeck({deck_id = "new", shuffled = true} = {})
{
  return axios.get(api + "deck/" + deck_id + "/" + (shuffled ? "shuffle/" : ""))
  .then(
    response => {
      return response.data.success ? new Deck(response.data) : undefined      
    }
  )
}

export function getCardKeys(cards: Card[] = []) : string
{
  let keys = ""
  if(cards.length > 0){
    cards.forEach(currentItem => {
      keys += `${currentItem.code},`
    });
  }
  return keys
}