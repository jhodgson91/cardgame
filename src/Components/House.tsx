import React, { Component } from 'react';
import './Main.scss'
import House from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  cards: string | false;
}

export default class House extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  
  render(): React.ReactNode {
    
    return (
        <section id="house">
          <div className="grid-container">
            <div className="grid-x grid-padding-x align-center">
              <div className="cell small-6 small-offset-3">
                <h2 className="text-center">House deck</h2>
                <div className="grid-container">
                  <div className="grid-x grid-padding-x small-12">
                    {this.props.cards}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}
 