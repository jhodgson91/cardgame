import * as api from '../api'

export interface CardData {
    image: string,
    value: api.CardValue,
    suit: api.CardSuit,
    code: api.CardCode
}

class Card {
    data: CardData = {
      image: '',
      value: '',
      suit: '',
      code: ''
    }

    constructor(data: CardData) {
        this._image = data.image
        this._value = data.value
        this._suit = data.suit
        this._code = data.code
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
