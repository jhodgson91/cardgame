import * as api from '../api'

export class CardIdentifier {
    code: api.CardCode
    valueCode: api.CardValueCode
    suitCode: api.CardSuitCode

    constructor(code: api.CardCode) {
        this.code = code;
        this.valueCode = this.code[0] as api.CardValueCode
        this.suitCode = this.code[1] as api.CardSuitCode
    }
    get suit(): api.CardSuit {
        return api.CardSuitMap[this.suitCode]
    }

    get value(): api.CardValue {
        return api.CardValueMap[this.valueCode]
    }
}

export interface CardData {
    image: string,
    value: api.CardValue,
    suit: api.CardSuit,
    code: api.CardCode
}

class Card {
    _image: string
    _identifier: CardIdentifier

    constructor(data: CardData) {
        this._image = data.image
        this._identifier = new CardIdentifier(data.code)
    }

    valueOf() {
        return this.numericValue
    }
    toString() {
        return `${this.value} OF ${this.suit}`
    }
    get isPictureCard() {
        return this.value === api.CardValue.JACK
            || this.value === api.CardValue.QUEEN
            || this.value === api.CardValue.KING
    }
    get image() {
        return this._image;
    }
    get numericValue() {
        return api.getCardValue(this)
    }
    get value() {
        return this._identifier.value;
    }
    get suit() {
        return this._identifier.suit;
    }
    get code() {
        return this._identifier.code;
    }
}

export default Card