class Game {
  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
  }

  start() {
    for (let i = 10; i < 36; i++) {
      const label = (i).toString(36);
      const button = document.createElement('button');
      button.textContent = label;
      button.addEventListener('click', () => {
        console.log(button.textContent);
      })
      this.lettersWrapper.appendChild(button);
    }
  }
}

const game = new Game(
  {
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')
  }
);

game.start();