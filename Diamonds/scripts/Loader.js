import { Common, SHOW_SCREEN, HIDE_SCREEN } from "./Common.js";

const HTML_LOADER_ID = "js-loading-screen";
const HTML_LOAD_CURRENT_ID = "js-loading-screen-current";
const HTML_LOAD_TOTAL_ID = "js-loading-screen-total";

class Loader extends Common {
  constructor() {
    super(HTML_LOADER_ID);
    this.bindMultipleElements();
    this.resetCounters();
  }

  bindMultipleElements() {
    this.currentElement = this.bindToElement(HTML_LOAD_CURRENT_ID);
    this.totalElement = this.bindToElement(HTML_LOAD_TOTAL_ID);
  }

  loadImage(imageURL) {
    this.toggleElementVisibility(this.element, SHOW_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;
    this.totalElement = this.totalCounter;
    const image = new Image();
    image.src = imageURL;
    image.addEventListener("load", (e) => this.itemLoaded(e));

    return image;
  }

  loadSound(soundURL) {
    this.toggleElementVisibility(this.element, SHOW_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;
    const audio = new Audio();
    audio.addEventListener('canplaythrough', event => this.itemLoaded(event), false);
    audio.src = soundURL;
    return audio;
  }

  itemLoaded(event) {
    event.target.removeEventListener(event.type, this.itemLoaded, false);
    this.loadedCounter++;
    this.currentElement.textContent = this.loadedCounter;
    this.totalElement = this.totalCounter;

    if (this.loadedCounter === this.totalCounter) {
      this.resetCounters();
      this.toggleElementVisibility(this.element, HIDE_SCREEN);
      window.dispatchEvent(new CustomEvent("dataLoaded"));
    }
  }

  resetCounters() {
    this.loadedCounter = 0;
    this.totalCounter = 0;
    this.isAllLoaded = true;
  }
}

export const loader = new Loader();
