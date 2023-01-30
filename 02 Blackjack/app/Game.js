import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';

class Game {
  constructor(playerName, table) {
    this.Player = new Player(playerName);
    this.dealer = new Player('Dealer');
    this.Table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      let playerCard = this.deck.pickOne();
      this.Player.hand.addCardToHand(playerCard);
      this.Table.showPlayerCard(playerCard.render());

      let dealerCard = this.deck.pickOne();
      this.dealer.hand.addCardToHand(dealerCard);
      this.Table.showDealerCard(dealerCard.render());
    }
  }
}
const table = new Table(
  document.getElementById('playersCards'),
  document.getElementById('dealersCards')
)

const game = new Game('Sławek', table);

game.run();