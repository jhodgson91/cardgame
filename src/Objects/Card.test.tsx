import * as api from '../api';
import Card from './Card';

//Intialise the thing you're going to test
var successCard : Card | undefined;
var failCard : Card | undefined;

//Setup test good and bad
beforeAll(async () => {
  let successData = {
    image: 'https://deckofcardsapi.com/static/img/AS.png',
    value: 'A',
    suit: 'S',
    code: 'AS'
  };
  let failData = {
    image: '',
    value: 'B',
    suit: 'A',
    code: 'BA'
  }
  successCard = new Card(successData);
  failCard = new Card(failData);
})

it('should return valid cards', () => {
  expect(successCard).toBeDefined();
  expect(successCard.valueOf()).toBe(11);
  expect(successCard.toString()).toBe('Ace OF Spades');
  expect(successCard.isPictureCard).toBe(false);
  expect(successCard.image).toBe('https://deckofcardsapi.com/static/img/AS.png');
  expect(successCard.value).toBe('Ace');
  expect(successCard.suit).toBe('Spades');
  expect(successCard.code).toBe('AS');
})

it('should handle errors nicely', () => {
  expect(failCard).toBeDefined();
  expect(failCard.isPictureCard).toBe(false);
  expect(failCard.image).toBe('');
  expect(failCard.value).toBe(undefined);
  expect(failCard.suit).toBe(undefined);
  expect(failCard.code).toBe('BA');
})

