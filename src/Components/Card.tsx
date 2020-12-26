import React, { FC } from 'react'
import { ICard } from '../Utils/types'
import './Main.scss'

interface Props {
    card: ICard
}

const Card: FC<Props> = ({ card }: Props) => (
    <div className="card small-4">
        <img 
            alt={`${card.value} OF ${card.suit}`} 
            className="card-img" 
            src={card.image} 
        />
    </div>
)

export default Card
