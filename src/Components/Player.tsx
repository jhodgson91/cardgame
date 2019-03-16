import React, { Component } from 'react';
import './Main.scss'

//Define props types
export interface Props {
  title: string;
  readOnly: boolean;
  playCard: () => void | undefined;
}

export default class Player extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  showButtons() {
    if (!this.props.readOnly) {
      return (
        <div className="small-2">
          <button className="button" onClick={this.props.playCard}>Play card</button>
        </div>
      )
    }
  }

  render(): React.ReactNode {
    return (
      <div className="grid-x grid-margin-x">
        <div className="small-2 small-offset-1">
          <h3>{this.props.title}</h3>
        </div>
        {this.showButtons()}
        <div id={this.props.title} className="cell player">
          <div className="grid-container">
            <div className="grid-x grid-padding-x">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
