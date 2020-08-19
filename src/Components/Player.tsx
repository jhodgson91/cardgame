import React, { FC } from 'react'
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

const Player: FC<Props> = (props) => {
  const { title, readOnly, turn, theme, playCard, snap } = props

  return (
    <div id={title} className="small-5 player">
      <div className="small-2 small-offset-1">
        <h3>{title}</h3>
      </div>
      {!readOnly && !turn && 
        <div className="small-2">
          <button className="button snap" onClick={snap}>Snap</button>
        </div>
      }
      {!readOnly && turn && 
        <div className="small-2">
          <button className="button play" onClick={playCard}>Play card</button>
          <button className="button snap" onClick={snap}>Snap</button>
        </div>
      }
      <div className={`cell player-cards ${theme}`} >
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
