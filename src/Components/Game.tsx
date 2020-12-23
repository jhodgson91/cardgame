import React, { FC, useEffect, useState } from 'react';
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import Player from '../Components/Player'
import PlayerWrapper from '../Components/PlayerWrapper'
import './Main.scss'
import * as deckService from '../Objects/Deck'
import * as pileService from '../Objects/Pile'
import { ICard, IDeck } from '../Utils/types'

interface playerName {
    name: string,
    readOnly: boolean
}

const Game: FC = () => {
    const [ready, setReady] = useState(false)
    const [deck, setDeck] = useState<IDeck>()
    const [cardInit,] = useState<number>(26)
    const [players,] = useState<playerName[]>([
        { name: 'house', readOnly: true },
        { name: 'p1', readOnly: false },
        { name: 'p2', readOnly: false }
    ])

    const playCard = async (player: string, card: ICard): Promise<void> => {
        if (ready && deck) {
            const main = players[0].name;
            const playerPile = await pileService.drawCardFrom(deck.deck_id, deck.piles[player]);
            const deckPile = await pileService.add(deck.deck_id, deck.piles[main], [card]);
            setDeck({
                ...deck, 
                piles: {
                    ...deck.piles,
                    [player]: playerPile,
                    [main]: deckPile
                },
            })
        } else {
            console.log('Play card error')
        }
    }

    useEffect(() => {
        const initGame = async () => {
            const newDeck = await deckService.create()
            const house = players[0].name
            const p1 = players[1].name
            const p2 = players[2].name
            const houseDeck = await deckService.newPile(newDeck, house)
            const p1Deck = await deckService.drawIntoPile(houseDeck, p1, cardInit)
            const p2Deck = await deckService.drawIntoPile(p1Deck, p2, cardInit)
            setReady(true)
            setDeck(p2Deck)
        }

        initGame()
    }, [cardInit, players])

    if (!ready || !deck) {
        return <Hero title="Loading" />
    }

    return (
        <div className="cell">
            <Hero title={deck.deck_id} />
            <PlayerWrapper title="These are players" grid={12}>
                {players.map(({name, readOnly}) =>
                    <Player 
                        title={name} 
                        key={String(name)} 
                        readOnly={readOnly} 
                        playCard={() => playCard(name, deck.piles[name].cards[0])}
                    >
                        {deck && deck.piles[name].cards.map(({ code, image, suit, value }) =>
                            <Card 
                                key={String(code)}
                                image={image} 
                                value={value} 
                                suit={suit} 
                                code={code} 
                            />
                        )}
                    </Player>
                )}
            </PlayerWrapper>
        </div>
    )
}

export default Game
