import { Deck } from './Deck.js';
import { Player } from './Player.js';
class Game {
  constructor({ playerName, playerCards, dealerCards }) {
    this.player = new Player(playerName);
    this.dealer = new Player('Dealer');
    this.playerCards = playerCards;
    this.dealerCards = dealerCards;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      let playerCard = this.deck.pickOne();
      this.player.hand.addCardToHand(playerCard);
      this.playerCards.appendChild(playerCard.render());

      let dealerCard = this.deck.pickOne();
      this.dealer.hand.addCardToHand(dealerCard);
      this.dealerCards.appendChild(dealerCard.render());
    }
  }
}

const game = new Game({
  playerName: 'Sławek',
  playerCards: document.getElementById('playersCards'),
  dealerCards: document.getElementById('dealersCards'),
})

game.run();