class Statistics {
  #gameResults = [];

  addGameToResults(win, bit) {
    const result = {
      win,
      bit
    }
    this.#gameResults.push(result);
  }

  getGamesHistory() {
    const result = {
      games: this.#gameResults.length,
      win: this.#gameResults.filter(item => item.win).length,
      loss: this.#gameResults.filter(item => !item.win).length,
    }
    return [result.games, result.win, result.loss];
  }
}
