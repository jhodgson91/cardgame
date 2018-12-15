import axios from 'axios'
import Card from './Card'
import { api } from '../api'

class Deck
{
    deck_id = "new";
    shuffled = false;
    remaining = 0;

    constructor(data)
    {
        this.deck_id = data.deck_id;
        this.shuffled = data.shuffled;
        this.remaining = data.remaining;
    }

    drawCards(num = 1)
    {
        return axios.get(`${this._url()}/draw/?count=${num}`)
        .then(
            response => {
                this.remaining = response.data.remaining;
                var cards = new Array(response.data.cards.length);
                for(var i = 0; i < cards.length; i++)
                {
                    cards[i] = new Card(response.data.cards[i]);
                }
                
                return cards;
            }
        )
    }

    shuffle()
    {
        return axios.get(`${this._url()}/shuffle/`);
    }

    _url()
    {
       return api + `deck/${this.deck_id}/`;
    }
}

export default Deck;
