import axios from "axios";
import Deck from "./Objects/Deck";

export const api = "https://deckofcardsapi.com/api/"

export function getDeck({deck_id = "new", shuffled = true} = {})
{
  return axios.get(api + "deck/" + deck_id + "/" + (shuffled ? "shuffle/" : ""))
  .then(
    response => {
      return new Deck(response.data)
    }
  )
}