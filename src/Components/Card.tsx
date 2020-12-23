import React, { FC } from 'react'
import './Main.scss'

export interface Props {
    image: string;
    value: string;
    suit: string;
    code: string;
}

const Card: FC<Props> = ({ image, value, suit, code }: Props) => (
    <div className="card small-4">
        <img alt={code} className="card-img" src={image} />
        <p>{`${value} OF ${suit}`}</p>
    </div>
)

export default Card
