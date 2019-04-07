import * as React from 'react';
import './Main.scss';
import Deck from '../Objects/Deck';
import * as api from '../api';
import Hero from './Hero';
import PlayerWrapper from './PlayerWrapper';
import Player from './Player';
import Card from './Card';

//Define props types
export interface Props {

}

interface playerName {
    name: string,
    readOnly: boolean,
    theme: string
}

//Define state types
interface State {
    isReady: boolean;
    deck: Deck;
    drawFrom: 'top' | 'bottom';
    cardInit: number;
    players: playerName[];
}

export default class Game extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isReady: false,
            deck: new Deck(),
            drawFrom: 'top',
            cardInit: 26,
            players: [
                { name: 'house', readOnly: true, theme: "house" },
                { name: 'p1', readOnly: false, theme: "p1" },
                { name: 'p2', readOnly: false, theme: "p2" }
            ]
        };
        this.playCard = this.playCard.bind(this);
        this.showHand = this.showHand.bind(this);
        this.getCards = this.getCards.bind(this);
    }

    async playCard(player: string) {
        if (this.state.isReady) {
            let d = this.state.deck;
            let p = this.state.players;
            let loc = this.state.drawFrom;
            let card = await d.piles[player].drawCardFrom(loc);
            //Move a card to the central deck
            await d.piles[p[0].name].add([card]);
            this.setState({
                deck: d
            })
            //Check snap rules
            let snapDeck = d.piles[p[0].name].cards;
            let last = snapDeck.length - 1;
            if (typeof snapDeck[last - 1] !== 'undefined') {
                if (snapDeck[last].value === snapDeck[last - 1].value) {
                    window.alert("SNAP");
                }
            }
        }
    }

    getCards(player: string) {
        let d = this.state.deck;
        if (this.state.isReady) {
            let cards = d.piles[player].cards
                .map(c =>
                    <Card
                        key={c.code.toString()}
                        image={c.image}
                        value={c.value}
                        suit={c.suit}
                        code={c.code}
                    />
                );
            return cards;
        }
    }

    showHand(typeOfPlayer: boolean) {
        let p = this.state.players;
        let d = this.state.deck;
        if (this.state.isReady) {
            let hand = p
                .filter(i => i.readOnly === typeOfPlayer)
                .map(i =>
                    <Player
                        title={i.name}
                        key={i.name.toString()}
                        readOnly={i.readOnly}
                        theme={i.theme}
                        playCard={() => { this.playCard(i.name) }}
                    >
                        {this.getCards(i.name)}
                    </Player>
                );
            return hand;
        }
    }

    async componentDidMount() {
        let d = await api.getDeck();
        let p = this.state.players;
        let num = this.state.cardInit;
        if (d) {
            //Call services to initiate game
            Promise.all([
                await d.newPile(p[0].name),
                await d.drawIntoPile(p[1].name, num),
                await d.drawIntoPile(p[2].name, num)
            ]);
            //Update state so game starts
            this.setState({
                isReady: true,
                deck: d
            });
        }
    }

    render(): React.ReactNode {

        const isReady: boolean = this.state.isReady;
        const ID: string = this.state.deck.id;
        const loadingText: string = "Loading...";
        const smallWidth: number = 6;
        const largeWidth: number = 12;
        const RO: boolean = true;
        const W: boolean = false;

        return (
            <div className="cell">
                {isReady ? <Hero title={ID} /> : <Hero title={loadingText} />}
                <PlayerWrapper title="This is the house" grid={largeWidth}>
                    {this.showHand(RO)}
                </PlayerWrapper>
                <PlayerWrapper title="These are players" grid={largeWidth}>
                    {this.showHand(W)}
                </PlayerWrapper>
            </div>
        )
    }
}
