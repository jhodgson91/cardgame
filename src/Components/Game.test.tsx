import * as React from 'react';
import * as enzyme from 'enzyme';
import Game from './Game';

it('renders all children and game is initialised without the API', () => {
  const game = enzyme.shallow(<Game />);
  expect(game.find('Hero')).toHaveLength(1);
  expect(game.find('House')).toHaveLength(1);
  expect(game.find('PlayerWrapper')).toHaveLength(1);
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().house).toEqual('house');
  expect(game.state().p1).toEqual('p1');
  expect(game.state().p2).toEqual('p2');
  expect(game.state().isReady).toEqual(false);
});

it('initialises properly when component is mounted', () => {
  const game = enzyme.mount(<Game />);
  expect(game.find('Hero')).toHaveLength(1);
  expect(game.find('House')).toHaveLength(1);
  expect(game.find('PlayerWrapper')).toHaveLength(1);
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().house).toEqual('house');
  expect(game.state().p1).toEqual('p1');
  expect(game.state().p2).toEqual('p2');
  expect(game.state().isReady).toEqual(false);
});