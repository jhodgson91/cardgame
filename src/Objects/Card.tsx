export interface CardData {
    image: string,
    value: string,
    suit: string,
    code: string
}

class Card
{
    data: CardData

    constructor(data:CardData)
    {
        this.data = data
    }

    get image() {
        return this.data.image;
    }
    get value() {
        return this.data.value;
    }
    get suit() {
        return this.data.suit;
    }
    get code() {
        return this.data.code;
    }
}

export default Card