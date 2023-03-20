import { Quote } from "./Quote.js";
class Game {
  #currentStep = 0;
  #lastStep = 7;

  quotes = [{
    text: 'Pan Tadeusz',
    category: 'Utwór literacki'
  },
  {
    text: 'Na zachodzie bez zmian',
    category: 'Film wojenny'
  },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];

    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  drawQuote() {
    const content = this.quote.getContent();
    if (!content.includes('_')) return this.winning();
    this.wordWrapper.innerHTML = content;
  }

  guess(e, letter) {
    e.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.#currentStep++;
      document.getElementsByClassName('step')[this.#currentStep].style.opacity = 1;
      if (this.#currentStep === this.#lastStep) this.loosing();
    }
  }


  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const label = (i).toString(36);
      const button = document.createElement('button');
      button.textContent = label;

      button.addEventListener('click', (e) => {
        this.guess(e, label)
      });
      this.lettersWrapper.appendChild(button);
    }
  }

  start() {
    document.getElementsByClassName('step')[this.#currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordWrapper.innerHTML = 'Gratulacje! Wygrywasz! Koniec gry.';
    this.lettersWrapper.innerHTML = '';
  }

  loosing() {
    this.wordWrapper.innerHTML = 'Przegrałeś! To Koniec gry.';
    this.lettersWrapper.innerHTML = '';
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