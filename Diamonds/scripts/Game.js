import {
  gameLevels, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET,
  DIAMOND_ARRAY_WIDTH, DIAMOND_ARRAY_HEIGHT
} from "./gameConstants.js";
import { canvas } from "./Canvas.js";
import { Common, SHOW_SCREEN } from "./Common.js";
import { media } from "./Media.js";
import { GameState } from "./GameState.js";
import { mouseController } from "./MouseController.js";
import { DIAMOND_SIZE } from "./Diamond.js";


class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    const currentLevel = gameLevels[level - 1];

    window.removeEventListener("dataLoaded", this.playLevel);
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
    this.handleMouseState();
    canvas.drawGameOnCanvas(this.gameState);
    this.gameState.gameBoard.forEach((diamond) => diamond.draw());
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }

  handleMouseState() {
    if (
      mouseController.clicked &&
      !this.gameState.isSwaping &&
      !this.gameState.isMoving
    ) {
      mouseController.state++;
      this.handleMouseClick();
    }
  }

  handleMouseClick() {
    if (!mouseController.clicked) {
      return;
    }
    const xClicked = Math.floor((mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
    const yClicked = Math.floor((mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

    if (!yClicked || xClicked >= DIAMOND_ARRAY_WIDTH || yClicked >= DIAMOND_ARRAY_HEIGHT) {
      mouseController.state = 0;
      return;
    }

    if (mouseController.state === 1) {
      mouseController.firstClick = {
        x: xClicked,
        y: yClicked
      }
    } else if (mouseController.state === 2) {
      mouseController.secondClick = {
        x: xClicked,
        y: yClicked
      }
      mouseController.state = 0;

      if (
        Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) +
        Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !== 1
      ) {
        return;
      } else {
        this.swapDiamonds();
        this.gameState.isSwaping(true);
        this.gameState.decreasePointsMovement();
      }
    }
    mouseController.clicked = false;
  }
}

export const game = new Game();
