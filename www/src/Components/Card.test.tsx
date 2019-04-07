import * as React from 'react';
import * as enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Card from './Card';

//Intialise the thing you're going to test
type CardData = {
  image: string,
  value: string,
  suit: string,
  code: string
};

var c: CardData = {
  image: 'https://deckofcardsapi.com/static/img/KH.png',
  value: 'KING',
  suit: 'HEARTS',
  code: 'KH'
}

var cArray: CardData[] = [
  {
    image: 'https://deckofcardsapi.com/static/img/KH.png',
    value: 'KING',
    suit: 'HEARTS',
    code: 'KH'
  },
  {
    image: 'https://deckofcardsapi.com/static/img/AS.png',
    value: 'ACE',
    suit: 'SPADES',
    code: 'AS'
  }
]

it('renders the same as last time', () => {
  const tree = renderer
    .create(<Card key={c.code} image={c.image} value={c.value} suit={c.suit} code={c.code} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with an image, a key and text', () => {
  const card = enzyme.shallow(
    <Card key={c.code} image={c.image} value={c.value} suit={c.suit} code={c.code} />
  );
  expect(card).toBeDefined();
  expect(card.find('img').prop('src')).toBe('https://deckofcardsapi.com/static/img/KH.png');
});

it('renders several cards with an array', () => {
  const cards = enzyme.shallow(
    <div>
      {cArray.map(card => <Card key={card.code} image={card.image} value={card.value} suit={card.suit} code={card.code} />)}
    </div>
  ).find("Card");
  expect(cards.at(0).key()).toBe("KH");
  expect(cards.at(1).key()).toBe("AS");
});
