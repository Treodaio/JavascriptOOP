import { Common, HIDE_SCREEN, SHOW_SCREEN } from './Common.js';
import { levelSelect } from './LevelSelect.js';

const SCALE_PROPERTY = '--scale-value';
const START_SCREEN_ID = 'js-start-screen';
const START_SCREEN_NEW_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';

class MainMenu extends Common {
  constructor() {
    super(START_SCREEN_ID);
    this.bindToGameElements();
    this.resizeGameWindow();
    window.addEventListener('resize', this.resizeGameWindow);
  }

  bindToGameElements() {
    const gameStartButton = this.bindToElement(START_SCREEN_NEW_GAME_BUTTON_ID);
    const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);

    gameStartButton.addEventListener('click', () => this.showLevel());
    gameSettingsButton.addEventListener('click', () => this.showSettingsScreen());
  }

  showLevel() {
    this.toggleElementVisibility(this.element, HIDE_SCREEN);
    levelSelect.toggleElementVisibility(levelSelect.element, SHOW_SCREEN);
  }

  showSettingsScreen() {
    console.log('settings');
  }

  resizeGameWindow() {
    const { innerWidth: width, innerHeight: height } = window;
    const scaleValue = Math.min(width / 640, height / 480);
    document.documentElement.style.setProperty(SCALE_PROPERTY, scaleValue);
  }
}

export const mainMenu = new MainMenu(); 
