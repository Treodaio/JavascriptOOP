class Wallet {
  #money;

  constructor(money) {
    this.#money = money;
  }

  getWalletValue = () => this.#money;

  checkCanPlay = value => {
    if (value > this.#money) return true;
    return false;
  }

  updateWalletValue(value, type = "+") {
    if (typeof (value) != "number" || isNaN(value) || typeof (type) != "string") return console.log('Parametry są nieprawidłowe.');
    else if (type === "+") return this.#money += value;
    else if (type === "-") return this.#money -= value;
    else {
      throw new Error('Nieprawidłowy typ działania');
    }
  }
}
