import { Common, SHOW_SCREEN } from './Common.js';

const CSS_GAME_WIN = "end-screen--is-win";
const HTML_END_SCREEN = "js-game-result";
const HTML_HEADER = "js-game-result-text";
const HTML_USER_POINTS = "js-user-points";
const HTML_HIGH_SCORES = "js-high-scores";
const HTML_BUTTON_BACKLEVEL = "js-back-to-levels";
const HTML_BUTTON_RESTART = "js-restart-level";


class ResultScreen extends Common {
  constructor() {
    super(HTML_END_SCREEN);
    this.bindToElements();
  }

  bindToElements() {
    this.resultTextHtml = this.bindToElement(HTML_HEADER);
    this.userPointsHtml = this.bindToElement(HTML_USER_POINTS);
    this.highScoresHtml = this.bindToElement(HTML_HIGH_SCORES);
    const backButtonHtml = this.bindToElement(HTML_BUTTON_BACKLEVEL);
    const restartLevelHtml = this.bindToElement(HTML_BUTTON_RESTART);

    backButtonHtml.addEventListener('click', () => {
      console.log('click');
    });
    restartLevelHtml.addEventListener('click', () => {
      console.log('click');
    });
  }


  viewResultScreen(isGameWin, playerPoints, level) {
    if (isGameWin) {
      this.element.classList.add(CSS_GAME_WIN);
    } else {
      this.element.classList.remove(CSS_GAME_WIN);
    }

    this.toggleElementVisibility(this.element, SHOW_SCREEN);
    this.resultTextHtml.textContent = isGameWin ? 'Wygrałeś!' : 'Przegrałeś';
    this.userPointsHtml.textContent = String(playerPoints);
  }
}


export const resultScreen = new ResultScreen();