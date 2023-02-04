import { Common, HIDE_SCREEN, SHOW_SCREEN } from './Common.js';

const START_SCREEN_ID = 'js-start-screen';
const START_SCREEN_NEW_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';

class MainMenu extends Common {
  constructor() {
    super(START_SCREEN_ID);
    this.bindToGameElements();
  }

  bindToGameElements() {
    const gameStartButton = this.bindToElement(START_SCREEN_NEW_GAME_BUTTON_ID);
    const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);

    gameStartButton.addEventListener('click', () => { this.showLevel(); });
    gameSettingsButton.addEventListener('click', () => { this.showSettingsScreen(); })
  }

  showLevel() {
    console.log('Start');
  }

  showSettingsScreen() {
    console.log('new start');

  }
}

export const mainMenu = new MainMenu(); 
