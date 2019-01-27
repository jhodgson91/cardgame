import React from 'react';
import ReactDOM from 'react-dom';
import DrawCardDemo from './Components/DrawCardDemo'

it('renders without crashing', () => {
  const div = document.createElement('div');
  expect(ReactDOM.render(<DrawCardDemo />, div)).toBeDefined();
});