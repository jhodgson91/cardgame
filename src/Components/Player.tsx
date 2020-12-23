import React, { FC } from 'react';
import './Main.scss'

export interface Props {
  title: string;
  readOnly: boolean;
  playCard: () => Promise<void> | undefined;
  children: React.ReactNode;
}

const Player: FC<Props> = ({ title, readOnly, playCard, children }: Props) => (
  <div id={title} className="cell auto player">
    <div className="cell">
      <h3>{title}</h3>
    </div>
    {!readOnly &&
      <div className="cell">
        <button className="button" onClick={playCard}>Play card</button>
      </div>
    }
    <div className="grid-container">
      <div className="grid-x grid-padding-x small-12">
        {children}
      </div>
    </div>
  </div>
)

export default Player
