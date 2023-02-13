import { gameLevels } from './levelsData.js';
import { canvas } from './Canvas.js';
import { Common, SHOW_SCREEN } from './Common.js';

const gameState = {
  points: 120,
  getPlayerPoints: () => 0,
  getMovementLeft: () => 10,
}
class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    window.removeEventListener('dataLoaded', this.playLevel);
    const currentLevel = gameLevels[level - 1];
    this.toggleElementVisibility(canvas.element, SHOW_SCREEN);
    this.animate();
  }

  animate() {
    canvas.drawGameOnCanvas(gameState);
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }
}


export const game = new Game();
