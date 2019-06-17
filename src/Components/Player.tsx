import React, { Component } from 'react';
import './Main.scss'

//Define props types
export interface Props {
  title: string;
  readOnly: boolean;
	turn: boolean;
  theme: string;
  playCard: () => void | undefined;
	snap: () => void | undefined;
}

export default class Player extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  showButtons() {
    if (!this.props.readOnly && this.props.turn) {
      return (
        <div className="small-2">
          <button className="button" onClick={this.props.playCard}>Play card</button>
					<button className="button" onClick={this.props.snap}>Snap</button>
        </div>
      )
    } else if (!this.props.readOnly && !this.props.turn) {
			return(
				<div className="small-2">
					<button className="button" onClick={this.props.snap}>Snap</button>
        </div>
			)
		}
  }

  render(): React.ReactNode {
    return (
      <div id={this.props.title} className="small-5 player">
        <div className="small-2 small-offset-1">
          <h3>{this.props.title}</h3>
        </div>
        {this.showButtons()}
        <div className={`cell player-cards ${this.props.theme}`} >
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
