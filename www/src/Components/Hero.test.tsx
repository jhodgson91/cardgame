import * as React from 'react';
import * as enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Hero from './Hero';

it('renders the same as last time with a button', () => {
  const tree = renderer
    .create(<Hero title="Test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when no text is set', () => {
  const hero = enzyme.shallow(<Hero title="" />);
  expect(hero.find('h1').text()).toBe('Card game - ')
});

it('renders the correct text', () => {
  const hero = enzyme.shallow(<Hero title='test' />);
  expect(hero.find("h1").text()).toBe('Card game - test')
});