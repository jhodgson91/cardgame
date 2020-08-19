import React, { FC } from 'react'
import './Main.scss'

//Define props types
export interface Props {
    image: string;
    value: string;
    suit: string;
    code: string;
}

const Card: FC<Props> = ({ image, value, suit, code }) => {
    return (
        <div className="card small-4">
            <img className="card-img" src={image}/>
        </div>
    )
}

export default Card
