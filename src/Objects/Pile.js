import axios from 'axios';
import { api, getCardKeys } from '../api';

import Card from './Card'

class Pile
{
    deck_id = ""
    name = ""
    cards = []

    constructor(deck_id, name, cards = []) {
        this.deck_id = deck_id
        this.name = name
        this.cards = cards
    }

    list(){
        return axios.get(`${this.url}/list/`)
        .then(response => {
            var cards = []
            response.data.piles[this.name].cards.forEach(currentItem => {
                cards.push(new Card(currentItem))
            });

            // The API knows better than us what the cards should be
            // so use list as a chance to get back in sync
            this.cards = cards
            return cards
        })
    }

    shuffle() {
        return axios.get(`${this.url}/shuffle/`)
    }

    add(cards = []){
        return axios.get(`${this.url}/add/?cards=${getCardKeys(cards)}`)
        .then(
            response => {
                // Checked this in the API - adding duplicate cards shifts them up the pile
                cards.forEach(card => {
                    var idx =this.cards.findIndex(c => c.code === card.code) 
                    if(idx >= 0){
                        this.cards.splice(idx, 1)
                    }
                });

                this.cards = [...this.cards, ...cards]
            }
        )
    }

    get remaining() {
        return this.cards.length;
    }
    get url() {
        return `${api}/deck/${this.deck_id}/pile/${this.name}`
    }
}

export default Pile