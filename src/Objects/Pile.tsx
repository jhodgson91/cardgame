import axios from 'axios';
import { url } from '../Utils/consts';
import { ICard, IDeck, IPile } from '../Utils/types'

const add = async (deck_id: IDeck['deck_id'], pile: IPile, newCards: ICard[] = []): Promise<IPile> => {
    const { data } = await axios.get(`${url}/${deck_id}/pile/${pile.name}/add/?cards=${String(newCards.map((card) => card.code))}/`)
    
    if (!data.success) {
        console.log('pile add fail')
        return pile
    }

    return { ...pile, cards: [...pile.cards, ...newCards] }
} 

const create = (deck_id: IPile['deck_id'], name: IPile['name'], cards: IPile['cards']): IPile => {
    return {
        deck_id,
        name,
        cards
    }
}

const drawCards = async (deck_id: IDeck['deck_id'], num = 1, pile: IPile): Promise<IPile> => {
    const { data } = await axios.get(`${url}/${deck_id}/pile/${pile.name}/draw/?count=${num}`)
    const drawnCards = data.cards.map((card: ICard) => card.code)
    const cards = pile.cards.filter(card => !drawnCards.includes(card.code))
    return { ...pile, cards }
}

const drawCardFrom = async (deck_id: IDeck['deck_id'], pile: IPile, from: 'top' | 'bottom' = 'bottom'): Promise<IPile> => {
    const { data } = await axios.get(`${url}/${deck_id}/pile/${pile.name}/draw/${from}/`)
    const drawnCards = data.cards.map((card: ICard) => card.code)
    const cards = pile.cards.filter(card => !drawnCards.includes(card.code))
    return { ...pile, cards }
}

const list = async (deck_id: IDeck['deck_id'], pile: IPile): Promise<IPile> => {
    const { data } = await axios.get(`${url}/${deck_id}/pile/${pile.name}/list/`)
    return {...pile, cards: data.pile[pile.name].cards}
}

export { add, create, drawCards, drawCardFrom, list }
