import React, { Component } from 'react';
import Hero from './Hero'
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
                                    
        <section id="deck">
          <div className="grid-container">
            <div className="grid-x grid-padding-x align-center">
              <div className="cell small-6 small-offset-3">
                <h2 className="text-center">House deck</h2>
                <div className="grid-container">
                  <div className="grid-x grid-padding-x small-12">
                    {this.cardViews('main')}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
                                              
        <section id="players">
          <div className="grid-container">
            <div className="grid-x grid-padding-x align-center text-center">
              <div className="cell small-12">
                <h2>These are the players</h2>
                <div className="grid-x grid-margin-x align-center text-center"> 

                    <div id="player" className="cell small-6">
                      <div className="cell">
                        <h3>Player 1</h3>
                      </div>
                      <div className="cell">
                        <button className="button" onClick={() => { this.playCard('p1') }}>Play card</button>
                      </div>
                      <div className="grid-container">
                        <div className="grid-x grid-padding-x small-12">
                          {this.cardViews('p1')}
                        </div>
                      </div>
                    </div>

                    <div id="ai" className="cell small-6">
                      <div className="cell">
                        <h3>Player 2</h3>
                      </div>
                      <div className="cell">
                        <button className="button" onClick={() => { this.playCard('p2') }}>Play card</button>
                      </div>
                      <div className="grid-container">
                        <div className="grid-x grid-padding-x small-12">
                          {this.cardViews('p2')}
                        </div>
                      </div>
                      
                    </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    );
  }

  async playCard(player: string) {
    if (this.state.isReady) {
      let card = await this.state.deck.piles[player].drawCardFrom('top');
      await this.state.deck.piles.main.add([card]);
      this.forceUpdate();
    }
  } 

  cardViews(pile: string) {
    var result = new Array<any>()
    if (this.state.isReady) {
        this.state.deck.piles[pile].cards.forEach(card => {
          result.push(
            <div className="card small-4" key={card.code}>
              <img className="card-img" src={card.image} />
            </div>
          )
        })
    }
    return result
  }
}
 