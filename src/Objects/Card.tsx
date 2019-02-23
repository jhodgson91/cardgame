import * as api from '../api'

export interface CardData {
    image: string,
    value: api.CardValue,
    suit: api.CardSuit,
    code: api.CardCode
}

class Card {
    _image: string
    _data: any

    constructor(data: CardData) {
        this._image = data.image
        this._data = data 
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
        return api.CardValueMap[this._data.value];
    }
  
    get suit() {
        return api.CardSuitMap[this._data.suit];
    }
    
    get code() {
        return this._data.code;
    }
}

export default Card
