import React, { Component } from 'react';
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import Player from '../Components/Player'
import PlayerWrapper from '../Components/PlayerWrapper'
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {

}

interface PlayerThing {
    name: string,
    readOnly: boolean
}

//Define state types
interface State {
    isReady: boolean;
    deck: Deck;
    cardInit: number;
    players: PlayerThing[];
}

export default class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isReady: false,
            deck: new Deck(),
            cardInit: 26,
            players: [
                { name: 'house', readOnly: true },
                { name: 'p1', readOnly: false },
                { name: 'p2', readOnly: false }
            ]
        };
        this.playCard = this.playCard.bind(this);
        this.getCards = this.getCards.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
    }

    getPlayers() {
        let playerList = this.state.players
        let showPlayers = playerList
            //.filter(playerType => playerType.readOnly)
            .map(player => {
                <Player
                    title={player.name}
                    key={player.name}
                    readOnly={player.readOnly}
                    playCard={() => { this.playCard(player.name) }}
                    cards={this.getCards(player.name)}
                />
            })
        if (this.state.isReady) {
            return (
                <div className="grid-x grid-margin-x align-center text-center">
                    {showPlayers}
                </div>
            )
        }
    }

    getCards(playerName: string) {
        let d = this.state.deck;
        return d.piles[playerName].cards;
    }

    async playCard(player: string) {
        if (this.state.isReady) {
            let d = this.state.deck;
            let main = this.state.players[0].name;
            let card = await d.piles[player].drawCardFrom('top');
            await d.piles[main].add([card]);
            this.setState({
                deck: d
            })
        }
    }

    async componentDidMount() {
        let d = await api.getDeck()
        let house = this.state.players[0].name
        let p1 = this.state.players[1].name
        let p2 = this.state.players[2].name
        if (d) {
            Promise.all([
                await d.newPile(house),
                await d.drawIntoPile(p1, this.state.cardInit),
                await d.drawIntoPile(p2, this.state.cardInit)
            ])
            this.setState({
                isReady: true,
                deck: d
            })
        }
    }

    render(): React.ReactNode {
        let hero;
        if (this.state.isReady) {
            hero = <Hero title={this.state.deck.id} />
        } else {
            hero = <Hero title="Loading" />
        }

        return (
            <div className="cell">
                {hero}
                <PlayerWrapper title="These are players" grid={12} filter={() => true}>
                    {this.getPlayers()}
                </PlayerWrapper>

            </div>
        )
    }
}
