import * as api from '../api'

export interface CardData {
    image: string,
    code: api.CardCode,
    value: api.CardValue,
    suit: api.CardSuit
}

class Card {
    _image: string
    _code: api.CardCode
    _value: api.CardValueCode
    _suit: api.CardSuitCode

    constructor(data: CardData) {
        this._image = data.image
        this._code = data.code
        this._value = data.code[0] as api.CardValueCode
        this._suit = data.code[1] as api.CardSuitCode
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
    get numericValue() {
        return api.getCardValue(this)
    }
    get image() {
        return this._image;
    }
    get value() {
        return api.CardValueMap[this._value];
    }
    get suit() {
        return api.CardSuitMap[this._suit];
    }
    get code() {
        return this._code;
    }
}

export default Card
