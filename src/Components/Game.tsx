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

//Define state types
interface State {
    isReady : boolean;
    deck : Deck;
    cardInit : number;
    players : any;
}

export default class Game extends React.Component<Props, State> {
  
    constructor(props: Props) {
        super(props);
        this.state = {
            isReady: false,
            deck: new Deck(),
            cardInit: 26,
            players: [
                {name: 'house', readOnly: true},
                {name: 'p1', readOnly: false},
                {name: 'p2', readOnly: false}
            ]
        };
        this.playCard = this.playCard.bind(this);
        this.getCards = this.getCards.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
    }
    
    async getPlayers(players: any) {
        let playerList = this.state.players
        let showPlayers = await playerList
            .filter(playerType => playerType.readOnly)
            .map(player => {
                <Player 
                    title={player.name} 
                    key={player.name} 
                    readOnly={player.readOnly} 
                    playCard={() => {this.playCard(player.name)}} 
                    cards={this.getCards(player.name)}
                />
             })
        if(this.state.isReady) {
            return (
                <div className="grid-x grid-margin-x align-center text-center"> 
                    {showPlayers}
                </div>
            )
        }
    }  
    
    async getCards(playerName: string) {
        let d = this.state.deck;
        let listCards = await d.piles[playerName].list()
        let cards = listCards 
            .map((card) => {
                <Card key={card.code} image={card.image} value={card.value} suit={card.suit} code={card.code}/>
            })
        if(this.state.isReady) {
            return (
                {cards}
            )
        }
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
    
      const players = this.state.players;

      return (
          <div className="cell">
              <Hero title={this.state.isReady && this.state.deck.id}/>
              <PlayerWrapper 
                  title="This is the house" 
                  grid="8" 
                  players={<Player 
                            title={this.state.players[0].name} 
                            key={this.state.players[0].name} 
                            readOnly={this.state.players[0].readOnly} 
                            playCard={() => {this.playCard(this.state.players[0].name)}} 
                            cards={this.getCards(this.state.players[0].name)}
                        />}
              />
              <PlayerWrapper title="These are players" grid="12" players={this.getPlayers(players)}/>
          </div>
      )
    }
}
 