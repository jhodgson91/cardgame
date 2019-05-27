import * as React from 'react';
import * as enzyme from 'enzyme';
import Link from '../Link.react';
import renderer from 'react-test-renderer';
import * as api from '../api';
import Game from './Game';

//TODO: Swap mount for mocked APIs and test state updates correctly

const testPlayers: Array<any> = [
    { id: 0, name: 'house', readOnly: true, theme: "house" },
    { id: 1, name: 'p1', readOnly: false, theme: "p1" },
    { id: 2, name: 'p2', readOnly: false, theme: "p2" }
]

it('renders the same as last time', () => {
  const tree = renderer
    .create(<Game />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('initialises state and components without API shallow', () => {
  const game = enzyme.shallow(<Game />);
  expect(game).toBeDefined();
  expect(game.find('Hero')).toHaveLength(1);
  expect(game.find('PlayerWrapper')).toHaveLength(2);
  expect(game.find('Player')).toBeUndefined;
  expect(game.find('Card')).toBeUndefined;
  expect(game.state().deck).toEqual({"deck_id": "", "piles": {}, "remaining": 0, "shuffled": false, "success": false});
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().players).toEqual(testPlayers);
  expect(game.state().isReady).toEqual(false);
});