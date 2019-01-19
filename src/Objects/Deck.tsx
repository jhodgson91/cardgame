import axios from 'axios'
import Card from './Card'
import Pile from './Pile'
import * as api from '../api'

type DeckData = {
    success: boolean,
    deck_id: string,
    shuffled: boolean
    remaining: number
    piles: {
        [name: string]: Pile
    }
}

class Deck {
    data: DeckData = {
        success: false,
        deck_id: "",
        shuffled: false,
        remaining: 0,
        piles: {}
    }

    constructor(data: DeckData | undefined = undefined) {
        if (data !== undefined) {
            this.data = data as DeckData
            if (this.data.piles === undefined) {
                this.data.piles = {}
            }
        }
    }

    // Draws num number of cards from this deck
    // Returns an array of Card objects
    async drawCards(num: number = 1) {
        return axios.get(`${this.url}/draw/?count=${num}`)
            .then(
                response => {
                    this.data.remaining = response.data.remaining;
                    var cards = new Array<Card>(response.data.cards.length);
                    for (var i = 0; i < cards.length; i++) {
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
    async shuffle() {
        return axios.get(`${this.url}/shuffle/`).then(
            response => {
                this.data.shuffled = response.data.shuffled
            }
        );
    }

    // Creates a new pile with an optional array of drawn cards
    async newPile(name: string, cards: Card[] = []) {
        return axios.get(`${this.url}/pile/${name}/add/?cards=${api.getCardKeys(cards)}`)
            .then(
                response => {
                    if (response.data.success) {
                        let p = new Pile(this.id, name, cards)
                        this.data.piles[name] = p
                        return p
                    }
                }
            );
    }

    // Draws num number of cards from this deck and puts them in pile name
    async drawIntoPile(name: string, num: number = 1) {
        let cards = await this.drawCards(num)
        if (cards instanceof Array) {
            if (this.piles[name] != undefined) {
                await this.piles[name].add(cards)
                return this.piles[name]
            }
            else {
                let pile = await this.newPile(name, cards)
                return pile;
            }
        }
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
        return `${api.url}/deck/${this.id}/`;
    }
}

export default Deck;
