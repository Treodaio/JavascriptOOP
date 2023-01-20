class Game {
  // Properta choć strzeżona, jest typu let. Może zostać nadpisana wewnątrz klasy. const jest w TypeScript.
  #wallet = null; #stats = null; #draw = null;

  constructor(startCash) {
    this.#stats = new Statistics();
    this.#wallet = new Wallet(startCash);
    this.#draw = new Draw();

    this.html = {
      colors: [...document.querySelectorAll('div.colors')],
      wallet: document.querySelector('#cash'),
      input: document.querySelector('input'),
      start: document.querySelector('#start'),
      result: document.querySelector('#result'),
      games: document.querySelector('#played'),
      wins: document.querySelector('#wins'),
      loss: document.querySelector('#loss'),
    };

    this.html.start.addEventListener('click', e => {
      e.preventDefault();
      this.startGame();
    });
  }

  render(
    colors = ['black', 'black', 'black'],
    money = this.#wallet.getWalletValue(),
    result = null,
    stats = [0, 0, 0],
    bid = 0,
    wonMoney = 0,
  ) {
    this.html.colors.forEach((color, index) => color.style.backgroundColor = colors[index]);
    this.html.wallet.textContent = money;
    this.html.games.textContent = stats[0];
    this.html.wins.textContent = stats[1];
    this.html.loss.textContent = stats[2];

    if (result === null) this.html.result.textContent = "Brak gry";
    else if (result === true) this.html.result.textContent = `Wygrałeś!`;
    else this.html.result.textContent = `Przegrałeś ${bid}`;
  }

  startGame() {
    //walidacje początkowe
    if (this.html.input.value < 1) return alert('Kwota którą chcesz grać jest za mała');
    const bid = Math.floor(this.html.input.value);

    if (this.#wallet.checkCanPlay(bid)) {
      return alert("Masz za mało środków")
    }

    this.#wallet.updateWalletValue(bid, '-');
    const colors = this.#draw.generateColors();
    const win = Result.checkWinner(colors);
    const wonMoney = Result.moneyWinInGame(win, bid);
    this.#wallet.updateWalletValue(wonMoney);
    this.#stats.addGameToResults(win, bid);


    this.render(
      colors,
      this.#wallet.getWalletValue(),
      win,
      this.#stats.getGamesHistory(),
      bid,
      wonMoney
    );
  }
}

// Draw - generuje kolory dla tablicy.
// Wallet - (1) - sprawdza czy można grać (2) = aktualizuje metody.
// Result.

