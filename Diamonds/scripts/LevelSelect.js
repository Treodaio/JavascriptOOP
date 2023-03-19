import { Common, HIDE_SCREEN, SHOW_SCREEN } from "./Common.js";
import { gameLevels } from "./gameConstants.js";
import { canvas } from "./Canvas.js";
import { loader } from "./Loader.js";
import { game } from "./Game.js";
import { media } from "./Media.js";
import { userData } from "./UserDataLocalStorage.js";

const HTML_LEVEL_SELECT_ID = "js-level-select-screen";
const CSS_LEVEL_SELECT = "level-select__button";

class LevelSelect extends Common {
  constructor() {
    super(HTML_LEVEL_SELECT_ID);
  }

  createButtons() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    gameLevels.some(gameLevel => this.createButton(gameLevel.level));
  }

  createButton(level) {
    if (!userData.checkAvailabilityLevel(level)) {
      return true;
    }

    const button = document.createElement("button");
    button.value = level;
    button.type = "button";
    button.textContent = level;
    button.classList.add(CSS_LEVEL_SELECT);
    button.addEventListener("click", (e) => this.handleLevelSelect(e));
    this.element.appendChild(button);
  }

  handleLevelSelect(event) {
    this.toggleElementVisibility(this.element, HIDE_SCREEN);
    this.toggleElementVisibility(canvas.element, SHOW_SCREEN);
    this.loadLevel(event.currentTarget.value);
  }

  loadLevel(level) {
    if (
      media.backgroundImage &&
      media.diamondsSprite &&
      media.backgroundMusic &&
      media.swapSound
    ) {
      window.addEventListener("dataLoaded", game.playLevel(level));
      return;
    }
    if (!media.diamondsSprite) {
      media.diamondsSprite = loader.loadImage(
        "./images/diamonds-transparent.png"
      );
    }
    if (!media.backgroundImage) {
      media.backgroundImage = loader.loadImage("./images/levelbackground.png");
    }
    if (!media.backgroundMusic) {
      media.backgroundMusic = loader.loadSound('./sounds/music-background.mp3');
    }
    if (!media.swapSound) {
      media.swapSound = loader.loadSound('./sounds/stone_rock_or_wood_moved.mp3');
    }

    window.addEventListener("dataLoaded", game.playLevel(level));
  }
}

export const levelSelect = new LevelSelect();
