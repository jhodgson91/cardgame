import React from 'react';
import ReactDOM from 'react-dom';
import DrawCardDemo from './Components/DrawCardDemo'

import Card from './Objects/Card'
import Deck from './Objects/Deck'
import Pile from './Objects/Pile'

import * as api from './api'

//ReactDOM.render(<Game />, document.getElementById('game'));

//Uncomment to see the DrawCardDemo
ReactDOM.render(<DrawCardDemo />, document.getElementById('game'));