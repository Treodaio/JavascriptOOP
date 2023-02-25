import { gameLevels } from './gameConstants.js';
import { canvas } from './Canvas.js';
import { Common, SHOW_SCREEN } from './Common.js';
import { Diamond } from './Diamond.js';
import { media } from './Media.js';
import { GameState } from './GameState.js';

class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    const currentLevel = gameLevels[level - 1];

    window.removeEventListener('dataLoaded', this.playLevel);
    this.gameState = new GameState(
      currentLevel.numberOfMovements,
      0,
      currentLevel.pointsToWin,
      currentLevel.level,
      currentLevel.board,
      media.diamondsSprite
    );
    this.toggleElementVisibility(canvas.element, SHOW_SCREEN);
    this.animate(this.gameState);
  }

  animate() {
    canvas.drawGameOnCanvas(this.gameState);
    this.gameState.gameBoard.forEach(diamond => diamond.draw());
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }
}

export const game = new Game();
