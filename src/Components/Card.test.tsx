import * as React from 'react';
import * as enzyme from 'enzyme';
import Card from './Card';

it('renders with an image and a key', () => {
  const card = enzyme.shallow(<Card image="https://deckofcardsapi.com/static/img/AH.png"/>);
  expect(card.find('img').prop('src')).toBe('https://deckofcardsapi.com/static/img/AH.png');
});

//Not sure we want this to work?
it('renders without an image', () => {
  const card = enzyme.shallow(<Card />);
  expect(card.find('img').prop('image')).toBeUndefined;
});
