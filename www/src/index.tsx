import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Game from './Game'
import { CardSelection } from './api';

const snapPiles: { [name: string]: CardSelection } = {
    "p1": { random: 26 },
    "p2": { random: 26 }
}

ReactDOM.render(<Game piles={snapPiles} />, document.getElementById('game'));
