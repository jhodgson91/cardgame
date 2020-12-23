import React, { FC } from 'react';
import './Main.scss'

export interface Props {
  title: string;
  grid: number;
  children: React.ReactNode;
}

const PlayerWrapper: FC<Props> = ({ title, grid, children }: Props) => (
  <section id="players">
    <div className="grid-container">
      <div className="grid-x grid-padding-x align-center text-center">
        <div className={`cell small-${grid}`}>
          <h2>{title}</h2>
          <div className="grid-x grid-padding-x align-center text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default PlayerWrapper
