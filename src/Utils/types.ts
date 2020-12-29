export interface ICard {
    image: string,
    value: string,
    suit: string,
    code: string
}

export interface IPile {
    deck_id: string,
    name: string,
    cards: ICard[]
}

export interface IDeck {
    success: boolean,
    deck_id: string,
    shuffled: boolean,
    remaining: number,
    piles: {
        [name: string]: IPile
    }
}
