import * as React from 'react';
import * as enzyme from 'enzyme';
import Card from './Card';

it('renders the correct text', () => {
  const hero = enzyme.shallow(<Card key='AH' src='https://deckofcardsapi.com/static/img/AH.png' />);
  expect(hero.find("img").prop("src")).toEqual('https://deckofcardsapi.com/static/img/AH.png');
  expect(hero.find("div").prop('key').toBe('AH')
});