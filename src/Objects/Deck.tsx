import axios from 'axios'
import * as pileService from './Pile'
import { url } from '../Utils/consts'
import { ICard, IDeck, IPile } from '../Utils/types'

const create = async (): Promise<IDeck> => {
    const { data } = await axios.get(`${url}/new/shuffle`)
    
    return {...data, piles: {}}
}

const drawCards = async (deck: IDeck, num = 1): Promise<ICard[]> => {
    const { data } = await axios.get(`${url}/${deck.deck_id}/draw/?count=${num}`) 
    
    return data.cards
}

const getDeck = async (deck_id: IDeck['deck_id']): Promise<IDeck> => {
    const { data } = await axios.get(`${url}/${deck_id}`)
    
    return data
}

const shuffleDeck = async (deck: IDeck): Promise<IDeck> => {
    const { data } = await axios.get(`${url}/${deck.deck_id}/shuffle/`)
    
    if (data && data.success) {
        return { ...deck, shuffled: data.shuffled }
    } else {
        return deck
    }
}

const newPile = async (deck: IDeck, name: IPile['name'], cards: ICard[] = []): Promise<IDeck> => {
    const {deck_id} = deck
    const cardsString = String(cards.map((card) => card.code))
    
    await axios.get(`${url}/${deck_id}/pile/${name}/add/?cards=${cardsString}`)
    const updatedDeck = pileService.create(deck, name, cards)
    
    return updatedDeck
}

const drawIntoPile = async (deck: IDeck, name: IPile['name'], num = 1): Promise<IDeck> => {
    const cards = await drawCards(deck, num)
    if (cards instanceof Array) {
        if (!deck.piles[name]) {
            deck = await newPile(deck, name, cards)
            return deck
        }

        const updatedDeck = await pileService.add(deck, name, cards)
        return updatedDeck
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
