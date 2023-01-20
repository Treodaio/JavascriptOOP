class Result {
  static moneyWinInGame(result, bid, counter = 2) {
    if (
      typeof (counter) != 'number'
      || isNaN(counter)
    ) throw new Error('Nieprawidłowe parametry dla moneyWinInGame');

    if (result) {
      return bid * counter;
    } else return 0;
  }

  static checkWinner(draw) {
    if (draw[0] === draw[1] && draw[0] === draw[2] && draw[1] === draw[2]) return true;
    else return false;
  }
}
