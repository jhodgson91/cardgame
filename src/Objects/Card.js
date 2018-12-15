
class Card
{
    image = ""
    value = ""
    suit = ""
    code = ""

    constructor(data)
    {
        this.image = data.image
        this.value = data.value
        this.suit = data.suit
        this.code = data.code
    }
}

export default Card