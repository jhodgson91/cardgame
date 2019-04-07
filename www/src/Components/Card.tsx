import * as React from 'react';
import './Main.scss'

//Define props types
export interface Props {
    image: string;
    value: string;
    suit: string;
    code: string;
}

export default class Card extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="card small-1">
                <img className="card-img" src={this.props.image} />
            </div>
        );
    }
}
