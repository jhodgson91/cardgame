import React, { Component } from 'react';
import './Main.scss'

//Define props types
export interface Props {
  title: string;
  grid: number;
}

export default class PlayerWrapper extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    // This wants to use the props.children thing we found to render its contents
    return (
      <section id="players">
        <div className="grid-container">
          <div className="grid-x grid-padding-x align-center">
            <div className={`cell small-${this.props.grid}`}>
              <h2>{this.props.title}</h2>
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
