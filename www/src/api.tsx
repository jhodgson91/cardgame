import axios, { AxiosResponse } from "axios";
import Deck from "./Objects/Deck";

export const url = "https://deckofcardsapi.com/api/"

export async function getDeck({ deck_id = "new", shuffled = true } = {}) {
    return axios.get(url + "deck/" + deck_id + "/" + (shuffled ? "shuffle/" : ""))
        .then(response => {
            return response.data.success ? new Deck(response.data) : undefined
        })
}

export type CardSuit = "H" | "D" | "S" | "C";
export type CardValue = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "J" | "Q" | "K";
export type CardCode = "AS" | "2S" | "3S" | "4S" | "5S" | "6S" | "7S" | "8S" | "9S" | "0S" | "JS" | "QS" | "KS"
    | "AD" | "2D" | "3D" | "4D" | "5D" | "6D" | "7D" | "8D" | "9D" | "0D" | "JD" | "QD" | "KD"
    | "AC" | "2C" | "3C" | "4C" | "5C" | "6C" | "7C" | "8C" | "9C" | "0C" | "JC" | "QC" | "KC"
    | "AH" | "2H" | "3H" | "4H" | "5H" | "6H" | "7H" | "8H" | "9H" | "0H" | "JH" | "QH" | "KH";

export type PileResponse = { [name: string]: CardCode[] };
export type GameResponse = {
    id: string,
    piles: PileResponse,
}

export type CardSelection =
    { all: boolean }
    | { top: number }
    | { bottom: number }
    | { random: number }
    | { cards: Card[] }
    | { filter: { suits?: CardSuit[], values?: CardValue[] } };

export type MoveRequest = {
    source: string,
    selection: CardSelection;
}

export class Card {
    code: CardCode;

    constructor(code: CardCode) {
        this.code = code;
    }

    get value(): CardSuit {
        return (this.code as string)[0] as CardSuit;
    }
    get suit(): CardSuit {
        return (this.code as string)[1] as CardSuit;
    }
}

export type Piles = { [name: string]: Card[] }


export const test_url = "/api/game";
export class Game {
    id: string;
    piles: Piles;

    static async new(): Promise<Game> {
        return axios.post<GameResponse>(test_url + "/new").then(response => {
            return new Game(response.data);
        })
    }

    constructor(data: GameResponse) {
        this.id = data.id;
        this.piles = {};
        Object.keys(data.piles).map((key, i) => {
            this.piles[key] = data.piles[key].map((code: CardCode) => new Card(code));
        })
    }

    async draw(from: string, to: string, selection: CardSelection) {
        let body: MoveRequest = {
            source: from,
            selection: selection,
        }

        return axios.put<GameResponse>(this.url + `/${to}`, body).then(response => {
            Object.assign(this, new Game(response.data));
        })
    }

    get url(): string {
        return test_url + `/${this.id}`;
    }
}