import * as React from 'react';
import * as enzyme from 'enzyme';
import * as api from '../api';
import Game from './Game';
import Deck from '../Objects/Deck'

//TODO: Swap mount for mocked APIs and test state updates correctly

var deck: Deck | undefined;

beforeAll(async () => {
    deck = await api.getDeck({ shuffled: false });
    expect(deck).toBeDefined();
})

it('renders all children and game is initialised without the API', () => {
  const game = enzyme.shallow(<Game />);
  expect(game).toBeDefined();
  expect(game.find('Hero')).toHaveLength(1);
  expect(game.find('PlayerWrapper')).toHaveLength(1);
  expect(game.state().cardInit).toEqual(26);
  expect(game.state().players[0].name).toEqual('house');
  expect(game.state().players[1].name).toEqual('p1');
  expect(game.state().players[2].name).toEqual('p2');
  expect(game.state().isReady).toEqual(false);
});