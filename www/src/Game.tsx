import * as React from 'react';

import axios, { AxiosResponse } from 'axios';
import { CardValue, MoveRequest, GameResponse, CardCode, CardSuit, CardSelection, BASE_URL, NEW_GAME_ID, DECK_ID } from './api';


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
    piles: Piles,
    ready: boolean
}

export default class Game extends React.Component<GameProps, GameState> {
    static defaultProps: GameProps = {
        id: NEW_GAME_ID,
        piles: {}
    }

    state: GameState = {
        id: this.props.id,
        piles: {},
        ready: false,
    }

    constructor(props: GameProps) {
        super(props);
        this.state = {
            id: props.id,
            piles: {},
            ready: false
        }
    }

    // Runs a simple get on the game and updates the state
    // Game ID is defaulted to "new", so right now this will get a new game every time
    async componentDidMount() {
        this.refresh(await axios.post(this.url));

        for (var key in this.props.piles) {
            await this.draw(DECK_ID, key, this.props.piles[key]);
        }

        this.setState({
            ready: true
        })
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
        console.log("Got an ID: " + id);

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
                Hello! My id is {this.isReady ? this.id : "???"}
                <div>I have these piles:</div>
                <ul>
                    {
                        Object.keys(this.piles).map((key) => {
                            return <li key={key}>{key}
                                <ul>
                                    {
                                        this.piles[key].map((card: Card) => {
                                            return <li key={card.code}>{card.code}</li>
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

    pile(name: string): Card[] {
        return this.state.piles[name]
    }

    get id(): string { return this.state.id; }
    get isReady(): boolean { return this.state.id != NEW_GAME_ID }
    get piles(): Piles { return this.state.piles; }
    get url(): string { return BASE_URL + `/${this.state.id}`; }
}