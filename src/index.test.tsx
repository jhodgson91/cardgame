import React from 'react';
import ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import Game from './Components/Game'

it('renders without crashing', () => {
  const game = enzyme.shallow(<Game />);
  const div = document.createElement('div');
  expect(ReactDOM.render(game, div)).toBeDefined();
});
