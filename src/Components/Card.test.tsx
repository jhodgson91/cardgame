import * as React from 'react';
import * as enzyme from 'enzyme';
import Card from './Card';

//Intialise the thing you're going to test
type CardData = {
    image: string,
    value: string,
    suit: string,
    code: string
};

var successCard: CardData = {
    image: 'https://deckofcardsapi.com/static/img/KH.png',
    value: 'KING',
    suit: 'HEARTS',
    code: 'KH'
}

it('renders with an image and a key', () => {
    const card = enzyme.shallow(<Card 
        key={successCard.code} 
        image={successCard.image} 
        value={successCard.value} 
        suit={successCard.suit} 
        code={successCard.code}
    />);
    expect(card).toBeDefined();
    expect(card.find('img').prop('src')).toBe('https://deckofcardsapi.com/static/img/KH.png');
    expect(card.find('p').text()).toBe('KING OF HEARTS');
});
