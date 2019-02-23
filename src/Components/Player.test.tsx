import * as React from 'react';
import * as enzyme from 'enzyme';
import Player from './Player';

//TODO: Test injecting cards with keys

it('renders with a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const player = enzyme.shallow(<Player title="house" readOnly={false} playCard={ mockCallBack } cards={<div id="test">Test</div>}/>);
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('div#test').text()).toBe('Test');
  expect(player.find('button').text()).toBe('Play card');
  player.find('button').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('renders without a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const player = enzyme.shallow(<Player title="house" readOnly={true} cards={<div id="test">Test</div>}/>);
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('div#test').text()).toBe('Test');
  expect(player.find('button')).toBeUndefined;
});



