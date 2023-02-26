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

  set diamondsSprite(image) {
    if (!image instanceof Image) return;
    this.#diamondsSprite = image;
  }

  get diamondsSprite() {
    return this.#diamondsSprite;
  }
}

export const media = new Media();
