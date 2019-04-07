import * as React from 'react';
import * as enzyme from 'enzyme';
import * as renderer from 'react-test-renderer';
import PlayerWrapper from './PlayerWrapper';

it('renders the same as last time', () => {
  //Mock the button clicking
  const mockCallBack = jest.fn();
  const tree = renderer
    .create(
      <PlayerWrapper title='house' grid={12}>
        <div id="test">Text</div>
      </PlayerWrapper>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a title and grid class', () => {
  const playerWrapper = enzyme.shallow(
    <PlayerWrapper title='house' grid={12}>
      <div id="test">Text</div>
    </PlayerWrapper>
  );
  expect(playerWrapper.find('#players')).toBeDefined;
  expect(playerWrapper.find('.small-12')).toBeDefined;
  expect(playerWrapper.find('h2').text()).toBe('house');
  expect(playerWrapper.find('div#test')).toBeDefined;
  expect(playerWrapper.find('#test').text()).toBe('Text');
});
