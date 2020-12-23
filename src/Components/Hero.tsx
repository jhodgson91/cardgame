import React, { FC } from 'react';
import './Main.scss'

export interface Props {
  title: string;
}

const Hero: FC<Props> = ({ title }: Props) => (
  <section id="hero">
    <div className="grid-container">
      <div className="grid-x grid-padding-x align-center text-center">
        <div className="small-12">
          <h1>Card game - {title}</h1>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
