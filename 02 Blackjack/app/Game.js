'use strict';
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { Message } from './Message.js';

class Game {
  constructor({ playerName, playerPoints, dealerPoints, table, btnAdd, btnStay, messageBox }) {
    this.Player = new Player(playerName);
    this.Dealer = new Player('Dealer');
    this.Table = table;
    this.messageBox = messageBox;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.btnAdd = btnAdd;
    this.btnStay = btnStay;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  addCard() {
    if (this.Player.hand.returnCardsQuantity() > 5) {
      return alert('Nie możesz dobrać więcej kart');
    }
    const card = this.deck.pickOne();
    this.Player.hand.addCardToHand(card);
    this.Table.showPlayerCard(card);
    this.playerPoints.innerHTML = this.Player.calculatePoints();
  }

  run() {
    this.btnAdd.addEventListener('click', () => { this.addCard(); });
    this.btnStay.addEventListener('click', () => { this.dealerPlays(); });
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      let playerCard = this.deck.pickOne();
      this.Player.hand.addCardToHand(playerCard);
      this.Table.showPlayerCard(playerCard);

      let dealerCard = this.deck.pickOne();
      this.Dealer.hand.addCardToHand(dealerCard);
      this.Table.showDealerCard(dealerCard);
    }

    this.playerPoints.innerHTML = this.Player.calculatePoints();
    this.dealerPoints.innerHTML = this.Dealer.calculatePoints();
  }

  dealerPlays() {
    let dealerPoints = this.Dealer.calculatePoints();
    let playerPoints = this.Player.calculatePoints();


    while (dealerPoints < playerPoints && playerPoints <= 21 && dealerPoints <= 21) {
      const card = this.deck.pickOne();
      this.Dealer.hand.addCardToHand(card);
      this.Table.showDealerCard(card);
      dealerPoints = this.Dealer.calculatePoints();
      this.dealerPoints.innerHTML = dealerPoints;
    }
    this.endGame(playerPoints, dealerPoints);
  }


  endGame(player, dealer) {
    this.btnAdd.removeEventListener('click', () => { this.addCard(); });
    this.btnAdd.removeEventListener('click', () => { this.dealerPlays(); });

    this.btnAdd.style.display = 'none';
    this.btnStay.style.display = 'none';

    if (player < 21 && player === dealer) {
      this.messageBox.setText('Remis').show();
      return;
    }
    if (player > 21) {
      this.messageBox.setText('Wygrywa Dealer').show();
      return;
    }
    if (dealer > 21) {
      this.messageBox.setText('Wygrywa Gracz').show();
      return;
    }
    if (player < dealer) {
      this.messageBox.setText('Wygrywa Dealer').show();
    }
  }
}
const table = new Table(
  document.getElementById('playersCards'),
  document.getElementById('dealersCards')
);

const messageBox = new Message(document.getElementById('message'));

const game = new Game({
  playerName: 'Sławek',
  table,
  btnAdd: document.getElementById('hit'),
  btnStay: document.getElementById('stand'),
  playerPoints: document.getElementById('playerPoints'),
  dealerPoints: document.getElementById('dealerPoints'),
  messageBox,
});

game.run();