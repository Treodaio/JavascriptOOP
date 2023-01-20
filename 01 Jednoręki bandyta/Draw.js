class Draw {
  #result = null;
  #options = ['red', 'green', 'blue'];

  #createResult() {
    const colors = [];
    for (let i = 0; i < this.#options.length; i++) {
      const index = Math.floor(Math.random() * this.#options.length);
      colors.push(this.#options[index]);
    }
    this.#result = colors;
  }

  generateColors() {
    this.#createResult();
    return this.#result;
  }
}
