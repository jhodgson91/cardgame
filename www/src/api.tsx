import axios from "axios";
import Deck from "./Objects/Deck";

export const url = "https://deckofcardsapi.com/api/"

export async function getDeck({ deck_id = "new", shuffled = true } = {}) {
    return axios.get(url + "deck/" + deck_id + "/" + (shuffled ? "shuffle/" : ""))
        .then(response => {
            return response.data.success ? new Deck(response.data) : undefined
        })
}
