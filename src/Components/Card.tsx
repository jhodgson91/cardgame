import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  key: any | false;
  src: string | false;
}

export default class Card extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  
  render(): React.ReactNode {
    return (
      <div className="card small-4" key={this.props.key}>
        <img className="card-img" src={this.props.src}/>
      </div>
    );
  }
}
 