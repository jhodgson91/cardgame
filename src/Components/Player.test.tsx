import * as React from 'react';
import * as enzyme from 'enzyme';
import Link from '../Link.react';
import renderer from 'react-test-renderer';
import Player from './Player';

it('renders the same as last time with a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const tree = renderer
    .create(
        <Player title="house" readOnly={false} playCard={ mockCallBack }>
            <div id="test">Text</div>
        </Player>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the same as last time without a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const tree = renderer
    .create(
        <Player title="house" readOnly={true} playCard={ mockCallBack }>
            <div id="test">Text</div>
        </Player>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders with a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const player = enzyme.shallow(
    <Player title="house" readOnly={false} playCard={ mockCallBack }>
      <div id="test">Text</div>
    </Player>
  );
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('button').text()).toBe('Play card');
  expect(player.find('#test').text()).toBe('Text');
  player.find('button').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('renders without a button', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const player = enzyme.shallow(<Player title="house" readOnly={true}/>);
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('button')).toBeUndefined;
});



