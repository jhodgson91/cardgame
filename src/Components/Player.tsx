import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  id: string | undefined;
  title: string | false;
  playCard: any | false;
  cards: any[] | false;
}

export default class Player extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  
  render(): React.ReactNode {
    
    return (
      <div id={this.props.id} className="cell small-6">
        <div className="cell">
          <h3>{this.props.title}</h3>
        </div>
        <div className="cell">
          <button className="button" onClick={this.props.playCard}>Play card</button>
        </div>
        <div className="grid-container">
          <div className="grid-x grid-padding-x small-12">
            {this.props.cards}
          </div>
        </div>
      </div>
    );
  }
}
 