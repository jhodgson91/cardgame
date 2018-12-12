//Headers for AJAX calls
const headers = {'Accept': 'application/json'};
const method = 'get';
const deck_id = "";


//Get a new deck
function getNewDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/", {headers : headers})
    //Check if the result is legit
    .then(response => {
      if(response.ok) 
        return response.json()
      throw new Error(response.statusText)//throw an error if it breaks 
    })

    //do stuff with the data
    .then(function handleData(data){
      console.log(data,"New Deck")
    })
    //catch any errors from the JSON result
    .catch(function handleError(error){
      console.log(error)
  })
}

function drawCards(deck_id,number) {
  fetch('https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count=' + number, {headers : headers})
    .then(response => {
      if(response.ok) 
        return response.json()
      throw new Error(response.statusText)//throw an error if it breaks 
    })

    //do stuff with the data
    .then(function handleData(data){
      console.log(data,"Draw Cards")
    })
    //catch any errors from the JSON result
    .catch(function handleError(error){
      console.log(error)
  })
}

function shuffleDeck(deck_id) {
  fetch('https://deckofcardsapi.com/api/deck/' + deck_id + '/shuffle/', {headers : headers})
    .then(response => {
      if(response.ok) 
        return response.json()
      throw new Error(response.statusText)//throw an error if it breaks 
    })

    //do stuff with the data
    .then(function handleData(data){
      console.log(data,"Shuffle desk")
    })
    //catch any errors from the JSON result
    .catch(function handleError(error){
      console.log(error)
  })
}