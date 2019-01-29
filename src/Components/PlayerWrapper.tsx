import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  title: string | false;
  players: any | false;
}

export default class PlayerWrapper extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  
  render(): React.ReactNode {
    
    return (
      <section id="players">
        <div className="grid-container">
          <div className="grid-x grid-padding-x align-center text-center">
            <div className="cell small-12">
              <h2>{this.props.title}</h2>
              {this.props.players}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
 