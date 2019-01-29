import React, { Component } from 'react';
import Hero from '../Components/Hero'
import House from '../Components/House'
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
  isReady:boolean;
  deck: Deck;
}

export default class DrawCardDemo extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false,
      deck: new Deck()
    };
    this.playCard = this.playCard.bind(this);
    this.cardViews = this.cardViews.bind(this);
  }
  
  async playCard(player: string) {
    if (this.state.isReady) {
      let d = this.state.deck
      let card = await d.piles[player].drawCardFrom('top');
      await d.piles.main.add([card]);
      
      this.setState({
        deck: d
      })
    }
  } 
  
  cardViews(pile: string) {
    let view = new Array<any>();
    if (this.state.isReady) {
      this.state.deck.piles[pile].cards.forEach(card => {
        view.push(
          <Card key={card.code} src={card.image}/>
        )
      })
    }
    return view;
  }
  
  async componentDidMount() {
    let d = await api.getDeck()
    if (d) {
      await d.newPile('main')
      await d.drawIntoPile('p1', 26)
      await d.drawIntoPile('p2', 26)

      this.setState({
        isReady: true,
        deck: d
      })
    }
  }

  render(): React.ReactNode {
    
    return (

      <div className="cell">
        <Hero title={this.state.isReady && this.state.deck.id}/>
        <House 
          title="House deck" 
          cards={this.cardViews('main')}
        />                               
        <PlayerWrapper 
          title="These are players"
          players={
            <div className="grid-x grid-margin-x align-center text-center"> 
              <Player 
                id="player1" 
                title="Player 1" 
                playCard={ () => {this.playCard('p1')} } 
                cards={this.cardViews('p1')}
              />
              <Player 
                id="player2" 
                title="Player 2" 
                playCard={ () => {this.playCard('p2')} } 
                cards={this.cardViews('p2')}
              />
            </div>
          }
        />
      </div>

    )
  }
}
 