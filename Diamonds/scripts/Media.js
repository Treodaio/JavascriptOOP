class Media {
  #backgroundImage;
  #diamondsSprite;
  #swapSound = null;
  #backgroundMusic = null;

  constructor() {
    this.#backgroundImage = null;
    this.#diamondsSprite = null;
    this.musicVolume = 0.3;
    this.soundVolume = 0.3;
    this.allowedMusic = true;
    this.allowedSound = true;
    this.isInLevel = false;
  }

  increaseMusicVolume() {
    this.musicVolume += 0.1;
    if (this.musicVolume > 1) {
      this.musicVolume = 1;
    }
    this.#backgroundMusic.volume = this.musicVolume;
  }

  decreaseMusicVolume() {
    this.musicVolume -= 0.1;
    if (this.musicVolume <= 0.1) {
      this.musicVolume = 0.1;
    }
    this.#backgroundMusic.volume = this.musicVolume;
  }

  increaseSoundVolume() {
    this.soundVolume += 0.1
    if (this.soundVolume > 1) {
      this.soundVolume = 1;
    }
    this.#swapSound.volume = this.soundVolume;
  }

  decreaseSoundVolume() {
    this.soundVolume -= 0.1
    if (this.soundVolume <= 0.1) {
      this.soundVolume = 0.1;
    }
    this.#swapSound.volume = this.soundVolume;
  }

  playBackgroundMusic() {
    if (!this.allowedMusic) {
      return;
    }
    this.#backgroundMusic.loop = true;
    this.#backgroundMusic.play();
  }

  stopBackgroundMusic() {
    this.#backgroundMusic.pause();
    this.#backgroundMusic.currentTime = 0;
  }

  playSwapSound() {
    if (!this.allowedSound) {
      return;
    }
    this.#swapSound.play();
  }

  toggleMusicOnOff() {
    if (this.allowedMusic) {
      this.allowedMusic = false;
      this.stopBackgroundMusic();
    } else {
      this.allowedMusic = true;
      this.playBackgroundMusic();
    }
  }

  set swapSound(sound) {
    this.#swapSound = sound;
    this.#swapSound.volume = this.soundVolume;
  }

  get swapSound() {
    return Boolean(this.#swapSound);
  }

  set backgroundMusic(music) {
    this.#backgroundMusic = music;
    this.#backgroundMusic.volume = this.musicVolume;
  }

  get backgroundMusic() {
    return Boolean(this.#backgroundMusic);
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
