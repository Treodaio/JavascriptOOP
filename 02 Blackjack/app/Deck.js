import { Card } from "./Card.js";
import { weight, type } from './Static.js';


export class Deck {
  cards = [];

  constructor() {
    type.forEach(type => {
      weight.forEach(weight => {
        this.cards.push(new Card(weight, type));
      })
    });
  }

  pickOne() {
    return this.cards.shift(this.cards);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * this.cards.length);
      const temp = this.cards[j];
      this.cards[j] = this.cards[i];
      this.cards[i] = temp;
    }
  }
}
