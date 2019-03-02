import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  data: CardData;
}

export interface CardData {
  image: string,
  code: api.CardCode,
  value: api.CardValue,
  suit: api.CardSuit
}

export default class Card extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  get isPictureCard() {
    return this.props.data.value === api.CardValue.JACK
      || this.props.data.value === api.CardValue.QUEEN
      || this.props.data.value === api.CardValue.KING
  }
  get value() {
    let value = this.props.data.code[0] as api.CardValueCode
    return api.CardValueMap[value];
  }
  get suit() {
    let suit = this.props.data.code[1] as api.CardSuitCode
    return api.CardSuitMap[suit];
  }
  toString() {
    return `${this.value} OF ${this.suit}`
  }
  render(): React.ReactNode {
    return (
      <div className="card small-4" key={this.props.data.code}>
        <img className="card-img" src={this.props.data.image}/>
        <p>{this.toString()}</p>
      </div>
    );
  }
}
