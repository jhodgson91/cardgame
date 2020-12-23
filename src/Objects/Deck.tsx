import axios from 'axios'
import * as pileService from './Pile'
import { url } from '../Utils/consts'
import { ICard, IDeck, IPile } from '../Utils/types'

const create = async (): Promise<IDeck> => {
    const response = await axios.get(`${url}/new`)
    
    return {...response.data, piles: {}}
}

const drawCards = async (deck: IDeck, num = 1): Promise<ICard[]> => {
    const response = await axios.get(`${url}/${deck.deck_id}/draw/?count=${num}`) 
    return response.data.cards
}

const getDeck = async (deck_id: IDeck['deck_id']): Promise<IDeck> => {
    const response = await axios.get(`${url}/${deck_id}`)
    
    return response.data
}

const shuffleDeck = async (deck: IDeck): Promise<IDeck> => {
    try {
        const response = await axios.get(`${url}/${deck.deck_id}/shuffle/`)
        if (response.data && response.data.success) {
            return { ...deck, shuffled: response.data.shuffled }
        } else {
            return deck
        }
    } catch (error) {
        console.log(error)
        return deck
    }
}

const newPile = async (deck: IDeck, name: IPile['name'], cards: ICard[] = []): Promise<IDeck> => {
    await axios.get(`${url}/${deck.deck_id}/pile/${name}/add/?cards=${String(cards.map((card) => card.code))}`)
    const newPile = pileService.create(deck.deck_id, name, cards)
    return {...deck, piles: { ...deck.piles, [name]: newPile }}
}

const drawIntoPile = async (deck: IDeck, name: IPile['name'], num = 1): Promise<IDeck> => {
    const cards = await drawCards(deck, num)
    if (cards instanceof Array) {
        if (!deck.piles[name]) {
            deck = await newPile(deck, name, cards)
            return deck
        }

        const updatedPile = await pileService.add(deck.deck_id, deck.piles[name], cards)
        return { ...deck, piles: { ...deck.piles, [name]: updatedPile }}
    }

    return deck
}

export { 
    create, 
    drawCards, 
    drawIntoPile, 
    getDeck,
    newPile, 
    shuffleDeck 
}
