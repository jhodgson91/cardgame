import * as React from 'react';
import * as enzyme from 'enzyme';
import Card from './Card';

//Intialise the thing you're going to test
var successCard : Card | undefined;
var failCard : Card | undefined;

//Setup test good and bad
beforeAll(() => {
  let successData = {
    image: 'https://deckofcardsapi.com/static/img/AS.png',
    value: 'A',
    suit: 'S',
    code: 'AS'
  };
  let failData = {
    image: '',
    value: 'B',
    suit: 'A',
    code: 'BA'
  }
  successCard = new Card(successData);
  failCard = new Card(failData);
})

it('renders with an image and a key', () => {
  const card = enzyme.shallow(<Card data={successCard}/>);
  expect(card.find('img').prop('src')).toBe('https://deckofcardsapi.com/static/img/AS.png');
});

//Not sure we want this to work?
it('renders without an image', () => {
  const card = enzyme.shallow(<Card data={failCard}/>);
  expect(card.find('img').prop('image')).toBeUndefined;
});
