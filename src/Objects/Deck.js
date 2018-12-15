import axios from 'axios'
import Card from './Card'
import { api } from '../api'


class Deck
{   
    constructor(data)
    {
        this.data = data
    }

    drawCards(num = 1)
    {
        return axios.get(`${this.url}/draw/?count=${num}`)
        .then(
            response => {
                this.data.remaining = response.data.remaining;
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
        return axios.get(`${this.url}/shuffle/`).then(
            response => {
                this.data.shuffled = response.data.shuffled
            }
        );
    }

    get id() {
        return this.data.deck_id;
    }
    get shuffled() {
        return this.data.shuffled;
    }
    get remaining() {
      return this.data.remaining;
    }

    get url() {
       return api + `deck/${this.id}/`;
    }
}

export default Deck;
