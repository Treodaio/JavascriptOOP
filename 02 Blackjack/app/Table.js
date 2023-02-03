export class Table {
  constructor(player, dealer) {
    this.playerArea = player;
    this.dealerArea = dealer;
  }

  showPlayerCard(card) {
    this.playerArea.appendChild(card.render());
  }
  showDealerCard(card) {
    this.dealerArea.appendChild(card.render());
  }
}