import {
  gameLevels, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET,
  DIAMOND_ARRAY_WIDTH, DIAMOND_ARRAY_HEIGHT,
  SWAPPING_DIAMOND_SPEED,
  EMPTY_BLOCK,
  DIAMOND_ARRAY_LAST_ELEMENT
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
    this.handleMouseClick();
    this.moveDiamonds();
    this.revertSwap();
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
      }
      this.swapDiamonds();
      this.gameState.isSwaping = true;
      this.gameState.decreasePointsMovement();
    }
    mouseController.clicked = false;
  }

  findMatches() {
    this.gameState.gameBoard.forEach((diamond, index, diamondsArray) => {
      //check rows
      if (diamond.kind === EMPTY_BLOCK || index < DIAMOND_ARRAY_WIDTH || index > DIAMOND_ARRAY_LAST_ELEMENT) {
        return;
      }

      if (
        diamond.kind === diamondsArray[index - 1].kind &&
        diamond.kind === diamondsArray[index + 1].kind
      ) {

        //check that they on the same row.
        if (Math.floor(index - 1) / DIAMOND_ARRAY_WIDTH === Math.floor(index + 1) / DIAMOND_ARRAY_WIDTH) {
          for (let i = -1; i <= 1; i++) {
            diamondsArray[index + i].match++;
          }
        }
      }
      //check columns
      if (
        index >= DIAMONDS_ARRAY_WIDTH &&
        index < DIAMOND_ARRAY_LAST_ELEMENT - DIAMOND_ARRAY_WIDTH + 1 &&
        diamond.kind === diamondsArray[index - DIAMOND_ARRAY_WIDTH].kind &&
        diamond.kind === diamondsArray[index + DIAMOND_ARRAY_WIDTH].kind
      ) {
        if ((index - DIAMOND_ARRAY_WIDTH) % DIAMOND_ARRAY_WIDTH === (index + DIAMOND_ARRAY_WIDTH) % DIAMOND_ARRAY_WIDTH) {
          for (let i = -DIAMOND_ARRAY_WIDTH; i <= DIAMOND_ARRAY_WIDTH; i += DIAMOND_ARRAY_WIDTH) {
            diamonds[index + i].match++;
          }
        }
      }

    });
  }

  swapDiamonds() {
    const firstDiamond = mouseController.firstClick.y * DIAMOND_ARRAY_WIDTH + mouseController.firstClick.x;
    const secondDiamond = mouseController.secondClick.y * DIAMOND_ARRAY_WIDTH + mouseController.secondClick.x;

    this.swap(this.gameState.gameBoard[firstDiamond], this.gameState.gameBoard[secondDiamond]);
  }

  moveDiamonds() {
    this.gameState.isMoving = false;

    this.gameState.gameBoard.forEach(diamond => {
      let dx;
      let dy;

      for (let speedSwap = 0; speedSwap < SWAPPING_DIAMOND_SPEED; speedSwap++) {
        dx = diamond.x - diamond.row * DIAMOND_SIZE;
        dy = diamond.y - diamond.column * DIAMOND_SIZE;

        if (dx) {
          diamond.x -= dx / Math.abs(dx);
        }

        if (dy) {
          diamond.y -= dy / Math.abs(dy);
        }
      }

      if (dx || dy) {
        this.gameState.isMoving = true;
      }
    });
  }

  revertSwap() {
    if (this.gameState.isSwaping && !this.gameState.isMoving) {
      // if (!this.scores) {
      //   this.swapDiamonds();
      //   this.gameState.increasePointsMovement();
      // }
      this.gameState.isSwaping = false;
    }
  }

  swap(firstDiamond, secondDiamond) {
    [
      firstDiamond.kind,
      firstDiamond.alpha,
      firstDiamond.match,
      firstDiamond.x,
      firstDiamond.y,

      secondDiamond.kind,
      secondDiamond.alpha,
      secondDiamond.match,
      secondDiamond.x,
      secondDiamond.y
    ] = [
        secondDiamond.kind,
        secondDiamond.alpha,
        secondDiamond.match,
        secondDiamond.x,
        secondDiamond.y,

        firstDiamond.kind,
        firstDiamond.alpha,
        firstDiamond.match,
        firstDiamond.x,
        firstDiamond.y
      ];

    this.gameState.isMoving = true;
  }
}

export const game = new Game();
