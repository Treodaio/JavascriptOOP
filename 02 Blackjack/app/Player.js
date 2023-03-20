import { Hand } from './Hand.js';

export class Player {
  #points = 0;
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
  }

  calculatePoints() {
    this.#points = this.hand.getStrength();
    return this.#points;
  }
}
