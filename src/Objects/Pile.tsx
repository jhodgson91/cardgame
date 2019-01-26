import axios from 'axios';
import * as api from '../api';

import Card, { CardData } from './Card'

class Pile {
    deck_id = ""
    name = ""
    cards: Card[] = []

    constructor(deck_id: string, name: string, cards: Card[] = []) {
        this.deck_id = deck_id
        this.name = name
        this.cards = cards
    }

    async list() {
        return axios.get(`${this.url}/list/`)
            .then(response => {
                var cards: Card[] = []
                response.data.piles[this.name].cards.forEach(function (c: CardData) {
                    cards.push(new Card(c))
                });

                // The API knows better than us what the cards should be
                // so use list as a chance to get back in sync
                this.cards = cards
                return cards
            })
    }

    async shuffle() {
        return axios.get(`${this.url}/shuffle/`)
          .then(
            response => {
              console.log(response.data.success)
              return response.data.success
          })
    }

    async add(cards: Card[] = []) {
        return axios.get(`${this.url}/add/?cards=${api.getCardKeys(cards)}/`)
            .then(
                response => {
                    // Checked this in the API - adding duplicate cards shifts them up the pile
                    cards.forEach((card: CardData) => {
                        var idx = this.cards.findIndex((c: CardData) => c.code === card.code)
                        if (idx >= 0) {
                            this.cards.splice(idx, 1)
                        }
                    });

                    this.cards = [...this.cards, ...cards]
                }
            )
    }
    
    /* This function is not supported until we can specifically draw cards from the deck
    async drawSpecificCards(cards: api.CardCode[]) {
        if (cards.length === 0) {
            return []
        }
        else {

            let cardKeys = ""
            cards.forEach(card => {
                cardKeys += `${card},`
            });
            cardKeys = cardKeys.slice(0, -1)

            return axios.get(`${this.url}/draw/?cards=${cardKeys}/`)
                .then(
                    response => {
                        let result = api.getCardsFromData(response.data.cards)
                        result.forEach(card => {
                            let idx = this.cards.findIndex(localCard => localCard.code === card.code)
                            if (idx >= 0) {
                                this.cards.splice(idx, 1)
                            }
                        });
                        return result
                    }
                )

        }
    }
    */

    async drawCards(num: number = 1) {
        return axios.get(`${this.url}/draw/?count=${num}`)
            .then(
                response => {
                    let result = api.getCardsFromData(response.data.cards)
                    result.forEach(card => {
                        let idx = this.cards.findIndex(localCard => localCard.code === card.code)
                        if (idx >= 0) {
                            this.cards.splice(idx, 1)
                        }
                    });

                    return result
                }
            )
    }

    async drawCardFrom(from: api.DrawFromType = 'top') {
        return axios.get(`${this.url}/draw/${from}/`)
            .then(
                response => {
                    let result = new Card(response.data.cards[0])
                    let idx = this.cards.findIndex(card => result.code === card.code)
                    if(idx >= 0) {
                        this.cards.splice(idx, 1)
                    }
                    return result
                }
            )
    }

    get remaining() {
        return this.cards.length;
    }
    get url() {
        return `${api.url}/deck/${this.deck_id}/pile/${this.name}`
    }
}

export default Pile