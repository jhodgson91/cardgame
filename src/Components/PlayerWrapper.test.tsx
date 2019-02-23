import * as React from 'react';
import * as enzyme from 'enzyme';
import PlayerWrapper from './PlayerWrapper';

//TODO: Test injecting cards with keys

it('renders with a title and a player mock', () => {
  const playerWrapper = enzyme.shallow(<PlayerWrapper title='house' players={<div id='test'>Test</div>}/>);
  expect(playerWrapper.find('#players')).toBeDefined;
  expect(playerWrapper.find('h2').text()).toBe('house');
  expect(playerWrapper.find('div#test')).toBeDefined;
  expect(playerWrapper.find('#test').text()).toBe('Test');
});
