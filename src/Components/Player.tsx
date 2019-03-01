import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  title: string;
  readOnly: any | false;
  playCard: any | false;
  cards: any[] | false;
}

export default class Player extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  
  showButtons() {
    if(!this.props.readOnly) {
      return (
        <div className="cell">
          <button className="button" onClick={this.props.playCard}>Play card</button>
        </div>
      )
    }
  }
  
  render(): React.ReactNode {
    return (
      <div id={this.props.title} className="cell auto player">
        <div className="cell">
          <h3>{this.props.title}</h3>
        </div>
        {this.showButtons()}
        <div className="grid-container">
          <div className="grid-x grid-padding-x small-12">
            {this.props.cards}
          </div>
        </div>
      </div>
    );
  }
}
 