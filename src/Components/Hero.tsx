import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'
import * as api from "../api"

//Define props types
export interface Props {
  title: string;
}

export default class Hero extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <section id="hero">
        <div className="grid-container">
          <div className="grid-x grid-padding-x align-center text-center">
            <div className="small-12">
              <h1>Card game - {this.props.title}</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
