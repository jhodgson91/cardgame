import * as React from 'react';
import * as enzyme from 'enzyme';
import Hero from './Hero';

it('renders when no text is set', () => {
  const hero = enzyme.shallow(<Hero title="" />);
  expect(hero.find('h1').text()).toBe('Card game - ')
});


it('renders the correct text', () => {
  const hero = enzyme.shallow(<Hero title='test' />);
  expect(hero.find("h1").text()).toBe('Card game - test')
});