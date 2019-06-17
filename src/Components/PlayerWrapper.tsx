import React, { Component } from 'react';
import './Main.scss'

//Define props types
export interface Props {
  title: string;
}

export default class PlayerWrapper extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    // This wants to use the props.children thing we found to render its contents
    return (
      <section className="players">
        <div className="grid-container">
					<div className="small-12">
						<h2>{this.props.title}</h2>
						<div className="grid-container">
							<div className="grid-x grid-padding-x align-center">
              	{this.props.children}
							</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
