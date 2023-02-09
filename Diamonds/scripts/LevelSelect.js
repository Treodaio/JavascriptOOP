import { Common, HIDE_SCREEN, SHOW_SCREEN } from "./Common.js";
import { canvas } from "./Canvas.js";
import { loader } from "./Loader.js";

const HTML_LEVEL_SELECT_ID = "js-level-select-screen";
const CSS_LEVEL_SELECT = 'level-select__button';

const gameLevels = [
  {
    level: 1,
  },
  {
    level: 2,
  },
  {
    level: 3,
  },
];

class LevelSelect extends Common {
  constructor() {
    super(HTML_LEVEL_SELECT_ID);

    gameLevels.forEach(gameLevel => {
      const button = this.createButtons(gameLevel.level)
      this.element.appendChild(button);
    });
  }

  createButtons(level) {
    const button = document.createElement('button');
    button.value = level;
    button.type = 'button';
    button.textContent = level;
    button.classList.add(CSS_LEVEL_SELECT);
    button.addEventListener('click', e => this.handleLevelSelect(e));
    return button;
  }

  handleLevelSelect(event) {
    this.toggleElementVisibility(this.element, HIDE_SCREEN);
    this.toggleElementVisibility(canvas.element, SHOW_SCREEN);
    this.loadLevel(event.currentTarget.value);
  }


  loadLevel(level) {
    const background = loader.loadImage('./images/levelbackground.png')
    window.addEventListener('dataLoaded', () => {
      console.log('załadowane wszystkie media');

    })
  }
}


export const levelSelect = new LevelSelect();