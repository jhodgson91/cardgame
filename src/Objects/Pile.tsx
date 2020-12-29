import axios from 'axios';
import { url } from '../Utils/consts';
import { ICard, IDeck, IPile } from '../Utils/types'

const add = async (deck: IDeck, name: IPile['name'], newCards: ICard[] = []): Promise<IDeck> => {
    const cards = String(newCards.map(({code}) => code)) 
    const pile = deck.piles[name]
    const {deck_id, piles} = deck
    
    const { data } = await axios.get(`${url}/${deck_id}/pile/${name}/add/?cards=${cards}/`)
    
    if (!data.success) {
        console.log('pile add fail')
        return deck
    }

    return { 
        ...deck, 
        piles: {
            ...piles,
            [name]: {...pile, cards: [...pile.cards, ...newCards]}
        }
         
    }
} 

const create = (deck: IDeck, name: IPile['name'], cards: ICard[]): IDeck => {
    const {deck_id, piles} = deck

    return {
        ...deck,
        piles: {
            ...piles,
            [name]: { deck_id, name, cards}
        }
    }
}

const drawCards = async (deck: IDeck, name: IPile['name'], noOfCards = 1): Promise<IDeck> => {
    const pile = deck.piles[name]
    const { deck_id, piles } = deck
    
    const { data } = await axios.get(`${url}/${deck_id}/pile/${name}/draw/?count=${noOfCards}`)
    
    const drawnCards = data.cards.map((card: ICard) => card.code)
    const cards = pile.cards.filter(({code}) => !drawnCards.includes(code))
    
    return { 
        ...deck,
        piles: {
            ...piles,
            [name]: {...pile, cards}
        } 
    }
}

const drawCardFrom = async (deck: IDeck, name: IPile['name'], from: 'top' | 'bottom' = 'bottom'): Promise<IDeck> => {
    const pile = deck.piles[name]
    const {deck_id, piles} = deck

    const { data } = await axios.get(`${url}/${deck_id}/pile/${name}/draw/${from}/`)
    
    const drawnCards = data.cards.map((card: ICard) => card.code)
    const cards = pile.cards.filter(({ code }) => !drawnCards.includes(code))
    
    const updatedDeck = { 
        ...deck,
        piles: {
            ...piles,
            [name]: {...pile, cards}
        } 
    }
    
    return updatedDeck
}

const list = async (deck: IDeck, name: IPile['name']): Promise<IDeck> => {
    const pile = deck.piles[name]
    const {deck_id, piles} = deck
    
    const { data } = await axios.get(`${url}/${deck_id}/pile/${name}/list/`)
    const { cards } = data.pile[name]
    
    return {
        ...deck, 
        piles: {
            ...piles,
            [name]: {...pile, cards}
        }
    }
}

export { add, create, drawCards, drawCardFrom, list }
