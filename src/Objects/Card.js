
class Card
{
    constructor(data)
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