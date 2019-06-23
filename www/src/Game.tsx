import * as React from 'react';

import axios, { AxiosResponse } from 'axios';
import {
    CardValue, MoveRequest, GameResponse,
    CardCode, CardSuit, CardSelection,
    BASE_URL, NEW_GAME_ID, INVALID_GAME_ID
} from './api';


export class Card {
    code: CardCode;

    constructor(code: CardCode) {
        this.code = code;
    }

    get value(): CardValue {
        return (this.code as string)[0] as CardValue;
    }
    get suit(): CardSuit {
        return (this.code as string)[1] as CardSuit;
    }

    jsx(): React.ReactNode {
        return (
            <div>{this.code}</div>
        )
    }

    toString() {
        return this.code as string;
    }
}

export type Piles = { [name: string]: Card[] }

export interface GameProps {
    id: string,
    piles: { [name: string]: CardSelection }
}

export interface GameState {
    id: string,
    piles: Piles
}

export default class Game extends React.Component<GameProps, GameState> {
    static defaultProps: GameProps = {
        id: NEW_GAME_ID,
        piles: {}
    }

    state: GameState = {
        id: INVALID_GAME_ID,
        piles: {}
    }

    // Props defaults to NEW_GAME_ID - in which case we POST
    // Otherwise, do a GET on the requested ID
    async componentDidMount() {
        let op = this.props.id != NEW_GAME_ID
            ? axios.get(`${BASE_URL}/${this.props.id}`)
            : axios.post(`${BASE_URL}/${NEW_GAME_ID}`, this.props.piles);

        this.refresh(await op);
    }

    // Draw cards from->to using selection
    async draw(from: string, to: string, selection: CardSelection) {
        let body: MoveRequest = {
            source: from,
            selection: selection,
        }

        this.refresh(await axios.put<GameResponse>(this.url + `/${to}/`, body));
    }

    // Updates state with data from a GameResponse
    refresh(response: AxiosResponse<GameResponse>) {
        let { id, piles } = response.data;

        let newPiles: Piles = {};
        Object.keys(piles).forEach(key => {
            newPiles[key] = piles[key].map((code: CardCode) => new Card(code));
        });

        this.setState({
            id: id,
            piles: newPiles
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                Hello! My id is {this.id}
                <div>I have these piles:</div>
                <ul>
                    {
                        Object.keys(this.piles).map((key) => {
                            return <li key={key}>{key}
                                <ul>
                                    {
                                        this.piles[key].map((card: Card) => {
                                            return <li key={card.code}>{card.jsx()}</li>
                                        })
                                    }
                                </ul>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    get id(): string { return this.state.id; }
    get isReady(): boolean { return this.state.id != INVALID_GAME_ID }
    get piles(): Piles { return this.state.piles; }
    get url(): string { return BASE_URL + `/${this.state.id}`; }
}