import React, { FC } from 'react'
import './Main.scss'

//Define props types
export interface Props {
  title: string;
}

const PlayerWrapper: FC<Props> = (props) => {
  return (
    <section className="players">
      <div className="grid-container">
        <div className="small-12">
          <h2>{props.title}</h2>
          <div className="grid-container">
            <div className="grid-x grid-padding-x align-center">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlayerWrapper
