import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './Components/Game'

import * as api from './api';

async function newapi_test() {
    let g = await api.test();
    console.log(g.piles["deck"][0].value);
    console.log(g.piles["deck"][0].suit);
}

newapi_test();
ReactDOM.render(<Game />, document.getElementById('game'));
