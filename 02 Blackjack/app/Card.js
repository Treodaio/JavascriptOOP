export class Card {
  mapTypeToSymbol = {
    hearts: '&hearts;',
    spades: '&spades;',
    diamonds: '&diams;',
    clubs: '&clubs;',
  }

  constructor(weight, type) {
    this.weight = weight;
    this.type = type;
  }

  render() {
    const card = document.createElement('div');
    card.setAttribute('class', `card ${this.type}`);
    card.innerHTML = `${this.weight} ${this.mapTypeToSymbol[this.type]}`;
    return card;
  }

}