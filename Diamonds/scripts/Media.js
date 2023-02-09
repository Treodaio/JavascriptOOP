class Media {
  #backgroundImage;
  #diamondsSprite;

  constructor() {
    this.#backgroundImage = null;
    this.#diamondsSprite = null;
  }

  set backgroundImage(backgroundObj) {
    if (!backgroundObj instanceof Image) return;
    this.#backgroundImage = backgroundObj;
  }

  get backgroundImage() {
    return this.#backgroundImage;
  }
}


export const media = new Media();