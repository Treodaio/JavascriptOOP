import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';

class Game {
  constructor({ playerName, table, btnAdd, btnStay }) {
    this.Player = new Player(playerName);
    this.dealer = new Player('Dealer');
    this.Table = table;
    this.btnAdd = btnAdd.addEventListener('click', this.addCard);
    this.btnStay = btnStay;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  addCard() {
    console.log('działa');
  }

  run() {
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      let playerCard = this.deck.pickOne();
      this.Player.hand.addCardToHand(playerCard);
      this.Table.showPlayerCard(playerCard);

      let dealerCard = this.deck.pickOne();
      this.dealer.hand.addCardToHand(dealerCard);
      this.Table.showDealerCard(dealerCard);
    }
  }
}
const table = new Table(
  document.getElementById('playersCards'),
  document.getElementById('dealersCards')
)

const game = new Game({
  playerName: 'Sławek',
  table,
  btnAdd: document.getElementById('hit'),
  btnStay: document.getElementById('stand')
});

game.run();