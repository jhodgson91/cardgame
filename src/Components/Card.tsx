import React, { Component } from 'react';
import './Main.scss'
import Deck from '../Objects/Deck'

//Define props types
export interface Props {
    image: string;
    value: string;
    suit: string;
    code: string;
}

export default class Card extends React.Component<Props> {
  
    constructor(props: Props) {
        super(props);
    }

    toString() {
        return `${this.props.value} OF ${this.props.suit}`
    }

    render(): React.ReactNode {
        console.log(this.props)
        return (
            <div className="card small-4">
                <img className="card-img" src={this.props.image}/>
                <p>{this.toString()}</p>
            </div>
        );
    }
}
