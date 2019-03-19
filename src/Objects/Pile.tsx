import axios from 'axios';
import * as api from '../api';

//TODO: Handle duplicates and existing cards for add and draw

interface Card {
    image: string,
    value: string,
    suit: string,
    code: string
}

class Pile {
    deck_id: string = ""
    name: string = ""
    cards: Card[] = []

    constructor(deck_id: string, name: string, cards: Card[]) {
        this.deck_id = deck_id
        this.name = name
        this.cards = cards
    }

    //Update the list of cards for a pile and returns cards
    async list() {
        return axios.get(`${this.url}/list/`)
            .then(response => {
                this.cards = response.data.piles[this.name].cards
                return this.cards
            })
    }

    //Shuffle the cards in a pile and returns success
    async shuffle() {
        return axios.get(`${this.url}/shuffle/`)
            .then(response => response.data.success)
    }

    //Add cards to a pile and updates cards
    async add(cards: Card[] = []) {
        return axios.get(`${this.url}/add/?cards=${cards.map((card) => card.code).toString()}/`)
            .then(response => {
                this.cards = [...this.cards, ...cards]
            })
    }

    //Draw a number of cards from a pile, removes them from the pile and returns filtered array
    async drawCards(num: number = 1) {
        return axios.get(`${this.url}/draw/?count=${num}`)
            .then(response => {
                let drawnCards: Card[] = response.data.cards
                drawnCards.forEach(drawnCard => {
                    let idx = this.cards.findIndex(localCard => localCard.code === drawnCard.code)
                    if (idx >= 0) {
                        this.cards.splice(idx, 1)
                    }
                });
                return drawnCards
            })
    }

    //Draw 1 card from a pile from the bottom or top and removes then from the pile and returns them
    async drawCardFrom(from: 'top' | 'bottom' = 'top') {
        return axios.get(`${this.url}/draw/${from}/`)
            .then(response => {
                let drawnCard = response.data.cards[0]
                let idx = this.cards.findIndex(card => drawnCard.code === card.code)
                if (idx >= 0) {
                    this.cards.splice(idx, 1)
                }
                return drawnCard
            })
    }

    //Get remaining cards in a pile
    get remaining() {
        return this.cards.length;
    }

    //Get base url for pile actions 
    get url() {
        return `${api.url}/deck/${this.deck_id}/pile/${this.name}`
    }
}

export default Pile