import * as React from 'react'
import * as enzyme from 'enzyme'
import renderer from 'react-test-renderer'
import Player from './Player'

//Mock the button clicking
const mockCallBack = jest.fn();

const playerButton: any = enzyme.shallow(
    <Player key={0} title="house" readOnly={false} theme="house" turn={true} playCard={ mockCallBack }>
        <div key={0} id="test">Text</div>
    </Player>
)

const playerNoButton: any = enzyme.shallow(
    <Player key={1} title="house" readOnly={true} title="house" playCard={ mockCallBack }>
        <div key={0} id="test">Text</div>
    </Player>
)
const playerNoChild: any = enzyme.shallow(
    <Player key={2} title="house" readOnly={true} theme="house"/>
)

it('renders the same as last time with a button', () => { 
  const tree = renderer
    .create(playerButton)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the same as last time without a button', () => {
  const tree = renderer
    .create(playerNoButton)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders with a button', () => {
  const player = playerButton;
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('.snap').text()).toBe('Snap');
  expect(player.find('#test').text()).toBe('Text');
  player.find('.play').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('renders without a button and no child component', () => {
  const player = playerNoChild;
  expect(player.find('#house')).toBeDefined;
  expect(player.find('h3').text()).toBe('house');
  expect(player.find('button')).toBeUndefined;
});



