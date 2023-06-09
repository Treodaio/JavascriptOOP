export class Hand {
  constructor() {
    this.cards = [];
  }

  returnCardsQuantity() {
    return this.cards.length;
  }

  addCardToHand(card) {
    this.cards.push(card);
  }

  countCardsByWeight(weight) {
    return this.cards.filter(card => card.weight == weight).length
  }

  getStrength() {
    if (this.cards.length === 2 && this.countCardsByWeight('A') === 2) {
      return 21;
    }

    const cardsValues = this.cards.map(card => {
      if (['K', 'Q', 'J'].includes(card.weight)) {
        return 10;
      }

      if (this.cards.length === 2 && card.weight === 'A') {
        return 11;
      }

      if (this.cards.length > 2 && card.weight == 'A') {
        return 1;
      }

      return parseInt(card.weight);
    })

    return cardsValues.reduce((accumulator, value) => {
      return parseInt(accumulator) + parseInt(value);
    })
  }
}