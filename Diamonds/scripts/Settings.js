import { Common, HIDE_SCREEN } from "./Common.js";

const HTML_SETTINGS_SCREEN = "js-settings-screen";
const HTML_EXIT_SETTINGS = "js-settings-screen-exit-button";
const HTML_MUSIC_ON_OFF = "js-music-on-off";
const HTML_SOUND_ON_OFF = "js-sound-on-off";
const HTML_VOLUME_INCREASE = "js-music-volume-increase";
const HTML_VOLUME_DECREASE = "js-music-volume-decrease";
const HTML_SOUND_INCREASE = "js-sound-volume-increase";
const HTML_SOUND_DECREASE = "js-sound-volume-decrease";


class Settings extends Common {
  constructor() {
    super(HTML_SETTINGS_SCREEN);
    this.bindElements();
  }

  bindElements() {
    const exitButton = this.bindToElement(HTML_EXIT_SETTINGS);
    const switchMusicButton = this.bindToElement(HTML_MUSIC_ON_OFF);
    const switchSoundsButton = this.bindToElement(HTML_SOUND_ON_OFF);
    const musicIncreaseButton = this.bindToElement(HTML_VOLUME_INCREASE);
    const musicDecreaseButton = this.bindToElement(HTML_VOLUME_DECREASE);
    const volumeIncreaseButton = this.bindToElement(HTML_VOLUME_INCREASE);
    const volumeDecreaseButton = this.bindToElement(HTML_VOLUME_DECREASE);

    exitButton.addEventListener('click', () => { this.hideSettingsScreen() });
  }

  hideSettingsScreen() {
    this.toggleElementVisibility(this.element, HIDE_SCREEN);
  }
}

export const settings = new Settings();