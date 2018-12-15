import axios from 'axios'
import Card from './Card'
import Pile from './Pile'
import { api, getCardKeys } from '../api'


class Deck
{   
    constructor(data)
    {
        this.data = data
        if(this.data.piles === undefined)
        {
            this.data.piles = {}
        }
    }

    // Draws num number of cards from this deck
    // Returns an array of Card objects
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
        .catch(error => {
          console.log(error.response)
        });
    }

    // Shuffles this deck
    shuffle()
    {
        return axios.get(`${this.url}/shuffle/`).then(
            response => {
                this.data.shuffled = response.data.shuffled
            }
        );
    }

    // Creates a new pile with an optional array of drawn cards
    newPile(name, cards = []) {
        return axios.get(`${this.url}/pile/${name}/add/?cards=${getCardKeys(cards)}`)
        .then(
            response => {
                let p = new Pile(this.id, name, response.data.piles[name].remaining)
                this.data.piles[name] = p
                return p
            }
        )
        .catch(error => {
          console.log(error.response)
        });
    }

    // Draws num number of cards from this deck and puts them in pile name
    drawIntoPile(name, num = 1) {
        return this.drawCards(num).then(
            cards => {
                return this.newPile(name, cards)
            }
        )
    }

    // getters
    get id() {
        return this.data.deck_id;
    }
    get shuffled() {
        return this.data.shuffled;
    }
    get remaining() {
      return this.data.remaining;
    }
    get piles() {
        return this.data.piles;
    }

    // Base URL for this deck
    get url() {
       return api + `deck/${this.id}/`;
    }
}

export default Deck;
