import {
  gameLevels, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET,
  DIAMOND_ARRAY_WIDTH, DIAMOND_ARRAY_HEIGHT,
  SWAPPING_DIAMOND_SPEED,
  EMPTY_BLOCK,
  DIAMOND_ARRAY_LAST_ELEMENT,
  TRANSPARENCY_SPEED
} from "./gameConstants.js";
import { canvas } from "./Canvas.js";
import { Common, SHOW_SCREEN } from "./Common.js";
import { media } from "./Media.js";
import { GameState } from "./GameState.js";
import { mouseController } from "./MouseController.js";
import { DIAMOND_SIZE, NUMBER_OF_DIAMOND_TYPES } from "./Diamond.js";
import { resultScreen } from "./ResultScreen.js";
import { userData } from "./UserDataLocalStorage.js";

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
    media.playBackgroundMusic();
    this.handleMouseState();
    this.handleMouseClick();
    this.findMatches();
    this.moveDiamonds();
    this.hideAnimation();
    this.countScores();
    this.revertSwap();
    this.clearMatched();
    this.checkEndOfTheGame();
    this.checkPosibilityMovement();
    canvas.drawGameOnCanvas(this.gameState);
    this.gameState.gameBoard.forEach((diamond) => diamond.draw());
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
      media.playSwapSound();
      media.playBackgroundMusic();
      this.gameState.isSwaping = true;
      this.gameState.decreasePointsMovement();
      mouseController.state = 0;
    }
    mouseController.clicked = false;
  }

  findMatches() {
    this.gameState.gameBoard.forEach((diamond, index, diamondsArray) => {
      //check rows
      if (diamond.kind === EMPTY_BLOCK || index < DIAMOND_ARRAY_WIDTH || index === DIAMOND_ARRAY_LAST_ELEMENT) {
        return;
      }

      if (
        diamond.kind === diamondsArray[index - 1].kind &&
        diamond.kind === diamondsArray[index + 1].kind
      ) {
        //check that they on the same row.
        if (Math.floor((index - 1) / DIAMOND_ARRAY_WIDTH) === Math.floor((index + 1) / DIAMOND_ARRAY_WIDTH)) {
          for (let i = -1; i <= 1; i++) {
            diamondsArray[index + i].match++;
          }
        }
      }
      //check columns
      if (
        index >= DIAMOND_ARRAY_WIDTH &&
        index < DIAMOND_ARRAY_LAST_ELEMENT - DIAMOND_ARRAY_WIDTH + 1 &&
        diamond.kind === diamondsArray[index - DIAMOND_ARRAY_WIDTH].kind &&
        diamond.kind === diamondsArray[index + DIAMOND_ARRAY_WIDTH].kind
      ) {
        if ((index - DIAMOND_ARRAY_WIDTH) % DIAMOND_ARRAY_WIDTH === (index + DIAMOND_ARRAY_WIDTH) % DIAMOND_ARRAY_WIDTH) {
          for (let i = -DIAMOND_ARRAY_WIDTH; i <= DIAMOND_ARRAY_WIDTH; i += DIAMOND_ARRAY_WIDTH) {
            diamondsArray[index + i].match++;
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

  hideAnimation() {
    if (this.gameState.isMoving) {
      return;
    }

    this.gameState.gameBoard.forEach(diamond => {
      if (diamond.match && diamond.alpha > 10) {
        diamond.alpha -= TRANSPARENCY_SPEED;
        this.gameState.isMoving = true;
      }
    });

  }

  countScores() {
    this.scores = 0;
    this.gameState.gameBoard.forEach(diamond => this.scores += diamond.match);
    if (!this.gameState.isMoving && this.scores) {
      this.gameState.increasePlayerPoints(this.scores);
    }
  }

  revertSwap() {
    if (this.gameState.isSwaping && !this.gameState.isMoving) {
      if (!this.scores) {
        this.swapDiamonds();
        this.gameState.increasePointsMovement();
      }
      this.gameState.isSwaping = false;
    }
  }

  clearMatched() {
    if (this.gameState.isMoving) {
      return;
    }

    this.gameState.gameBoard.forEach((_, idx, diamonds) => {
      const index = diamonds.length - 1 - idx;
      const column = Math.floor(index / DIAMOND_ARRAY_WIDTH);
      const row = Math.floor(index % DIAMOND_ARRAY_WIDTH);

      if (diamonds[index].match) {
        for (let counter = column; counter >= 0; counter--) {
          if (!diamonds[counter * DIAMOND_ARRAY_WIDTH + row].match) {
            this.swap(diamonds[counter * DIAMOND_ARRAY_WIDTH + row], diamonds[index]);
            break;
          }
        }
      }
    });

    this.gameState.gameBoard.forEach((diamond, index) => {
      const row = Math.floor(index % DIAMOND_ARRAY_WIDTH) * DIAMOND_SIZE;
      if (index < DIAMOND_ARRAY_WIDTH) {
        diamond.kind = EMPTY_BLOCK;
        diamond.match = 0;
      } else if (diamond.match || diamond.kind === EMPTY_BLOCK) {
        diamond.kind = Math.floor(Math.random() * NUMBER_OF_DIAMOND_TYPES)
        diamond.y = 0;
        diamond.x = row;
        diamond.match = 0;
        diamond.alpha = 255;
      }
    });
  };

  checkEndOfTheGame() {
    if (
      !this.gameState.isMoving &&
      !this.gameState.isSwaping &&
      !this.gameState.leftMovement
    ) {
      const isPlayerWinner = this.gameState.isPlayerWinner();

      if (isPlayerWinner && gameLevels[this.gameState.level]) {

        let level = Number(this.gameState.level);

        if (!userData.checkAvailabilityLevel(level + 1)) {
          userData.addNewLevel(level + 1);
        }

        if (this.gameState.playerPoints > userData.getHighScores(level)) {
          userData.setHighScores(level, this.gameState.playerPoints)
        }
      }
      resultScreen.viewResultScreen(isPlayerWinner, this.gameState.playerPoints, this.gameState.level);



    } else {
      this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }
  };

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


  checkPosibilityMovement() {
    if (this.gameState.isMoving) {
      return;
    }

    this.isPossisbleToMove = this.gameState.gameBoard.some((diamond, index, diamonds) => {
      if (diamond.kind === EMPTY_BLOCK) {
        return false;
      }

      // move right => check in row
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 3
        && diamond.kind === diamonds[index + 2].kind
        && diamond.kind === diamonds[index + 3].kind
      ) {
        return true;
      }

      // move right => check if is in the middle of the column
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 1
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 1].kind
      ) {
        return true;
      }

      // move right ==> check if is on the top of the column
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 2
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH * 2 + 1].kind
      ) {
        return true;
      }

      // move right => check if is on the bottom of the column
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 2
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH * 2 + 1].kind
      ) {
        return true;
      }

      // move left => check in row
      if (
        index % DIAMOND_ARRAY_WIDTH > 2
        && diamond.kind === diamonds[index - 2].kind
        && diamond.kind === diamonds[index - 3].kind
      ) {
        return true;
      }

      // move left => check if is in the middle of the column
      if (
        index % DIAMOND_ARRAY_WIDTH
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 1
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH - 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH - 1].kind
      ) {
        return true;
      }

      // move left => check if is on the top of the column
      if (
        index % DIAMOND_ARRAY_WIDTH
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 2
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH - 1].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH * 2 - 1].kind
      ) {
        return true;
      }

      // move left => check if is on the bottom of the column
      if (
        index & DIAMOND_ARRAY_WIDTH
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 2
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH - 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH * 2 - 1].kind
      ) {
        return true;
      }

      // move down => check if is in column
      if (
        Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 3
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH * 2].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH * 3].kind
      ) {
        return true;
      }

      // move down => check if is in the middle of the row
      if (
        index % DIAMOND_ARRAY_WIDTH
        && index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 1
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH - 1].kind
      ) {
        return true;
      }

      // move down => check if is in the left edge of the row
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 2
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 1
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH + 2].kind
      ) {
        return true;
      }

      // move down => check if is in the right edge of the row
      if (
        index % DIAMOND_ARRAY_WIDTH > 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) < DIAMOND_ARRAY_HEIGHT - 1
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH - 1].kind
        && diamond.kind === diamonds[index + DIAMOND_ARRAY_WIDTH - 2].kind
      ) {
        return true;
      }

      // move up => check in column
      if (
        Math.floor(index / DIAMOND_ARRAY_WIDTH) > 3
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH * 2].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH * 3].kind
      ) {
        return true;
      }

      // move up => check if is in the middle of the row
      if (
        index % DIAMOND_ARRAY_WIDTH
        && index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 1
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH - 1].kind
      ) {
        return true;
      }

      // move up => check if is in the left edge of the row
      if (
        index % DIAMOND_ARRAY_WIDTH < DIAMOND_ARRAY_WIDTH - 2
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 1
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH + 2].kind
      ) {
        return true;
      }

      // move up => check if is in the right edge of the row
      if (
        index % DIAMOND_ARRAY_WIDTH > 1
        && Math.floor(index / DIAMOND_ARRAY_WIDTH) > 1
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH - 1].kind
        && diamond.kind === diamonds[index - DIAMOND_ARRAY_WIDTH - 2].kind
      ) {
        return true;
      }

      return false;
    });

    if (!this.isPossisbleToMove) {
      this.gameState.mixDiamonds();
    }
  }


}

export const game = new Game();
