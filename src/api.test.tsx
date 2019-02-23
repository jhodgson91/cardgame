import * as api from './api';
import Card from './Objects/Card';

var aceCard : Card | undefined;
var pictureCard : Card | undefined;
var regularCard : Card | undefined;
var defaultRuleSet : RuleSet | undefined;
var newRuleSet : RuleSet | undefined;

beforeAll(async () => {
  
  let aceData = {
    image: 'https://deckofcardsapi.com/static/img/AS.png',
    value: 'A',
    suit: 'S',
    code: 'AS'
  };
  
  let pictureData = {
    image: '',
    value: 'J',
    suit: 'S',
    code: 'JS'
  };
  
  let regularData = {
    image: '',
    value: '7',
    suit: 'S',
    code: '7S'
  };
  
  defaultRuleSet = {
    AceHigh: true,
    PictureCardValue: 10
  };
  
  newRuleSet = {
    AceHigh: false,
    PictureCardValue: 12
  };
  
  aceCard = new Card(aceData);
  pictureCard = new Card(pictureData);
  regularCard = new Card(regularData);
  
})

it('should be ace high', () => {
  expect(api.getCardValue(aceCard,defaultRuleSet)).toBe(11);
})

it('should be ace low', () => {
  expect(api.getCardValue(aceCard,newRuleSet)).toBe(1);
})

it('should match the rule value', () => {
  expect(api.getCardValue(pictureCard,defaultRuleSet)).toBe(10);
  expect(api.getCardValue(pictureCard,newRuleSet)).toBe(12);
})

it('should match the value of the regular card', () => {
  expect(api.getCardValue(regularCard,defaultRuleSet)).toBe(7);
})