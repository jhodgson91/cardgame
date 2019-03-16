import * as React from 'react';
import * as enzyme from 'enzyme';
import Link from '../Link.react';
import renderer from 'react-test-renderer';
import * as api from '../api';
import Game from './Game';

//TODO: Swap mount for mocked APIs and test state updates correctly

var testDeck: Deck | undefined;
const testPlayers: Array<any> = [
    { name: 'house', readOnly: true },
    { name: 'p1', readOnly: false },
    { name: 'p2', readOnly: false }
]

beforeAll(async () => {
    testDeck = await api.getDeck({ shuffled: false });
    expect(testDeck).toBeDefined();
})

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
  expect(game.state().deck).toEqual({"data": {"deck_id": "", "piles": {}, "remaining": 0, "shuffled": false, "success": false}});
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().players).toEqual(testPlayers);
  expect(game.state().isReady).toEqual(false);
});

it('initialises state and components with API mount',  async () => {
  const game = enzyme.mount(<Game />);
  await game.instance().componentDidMount();
  expect(game).toBeDefined();
  expect(game.find('Hero')).toHaveLength(1);
  expect(game.find('PlayerWrapper')).toHaveLength(2);
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().players).toEqual(testPlayers);
  expect(game.state().isReady).toEqual(true);
});