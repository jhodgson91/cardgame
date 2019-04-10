import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './Components/Game'

import * as api from './api';

async function newapi_test() {
    let g = await api.Game.new();
    console.log(g);
    await g.draw("deck", "test", { random: 10 });
    console.log(g);
}

newapi_test();
ReactDOM.render(<Game />, document.getElementById('game'));
