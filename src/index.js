import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Components/App';
import DrawCardDemo from './Components/DrawCardDemo'

ReactDOM.render(<Game />, document.getElementById('game'));

// Uncomment to see the DrawCardDemo
//ReactDOM.render(<DrawCardDemo />, document.getElementById('game'));