import { Diamond } from './Diamond.js';
import { DIAMOND_ARRAY_WIDTH } from './gameConstants.js';
export class GameState {
  #leftMovement = null;
  #playerPoints = null;
  #pointsToWin = null;
  #level = null;
  #gameBoard = null;
  #isSwaping = false;
  #isMoving = false;

  constructor(leftMovement, playerPoints, pointsToWin, level, diamonds, diamondSpriteImage) {
    this.#leftMovement = leftMovement;
    this.#playerPoints = playerPoints;
    this.#pointsToWin = pointsToWin;
    this.#level = level;
    this.#gameBoard = diamonds.map(({ x, y, row, column, kind }) => new Diamond(x, y, row, column, kind, diamondSpriteImage));
  }

  mixDiamonds() {
    const mixedDiamonds = this.gameBoard.splice(0, DIAMOND_ARRAY_WIDTH);
    let index = DIAMOND_ARRAY_WIDTH;

    while (this.gameBoard.length) {
      const randomNumber = Math.floor(Math.random() * this.gameBoard.length);
      const nextElementToMix = this.gameBoard.splice(randomNumber, 1)[0];

      const newElement = {
        ...nextElementToMix,
        row: index % DIAMOND_ARRAY_WIDTH,
        column: Math.floor(index / DIAMOND_ARRAY_WIDTH),
      };
      index++;
      mixedDiamonds.push(newElement);
    }
    this.#gameBoard.push(...mixedDiamonds);
  }

  get leftMovement() {
    return this.#leftMovement;
  }

  get gameBoard() {
    return this.#gameBoard;
  }

  get pointsToWin() {
    return this.#pointsToWin;
  }

  get playerPoints() {
    return this.#playerPoints;
  }

  get level() {
    return this.#level;
  }

  get isSwaping() {
    return this.#isSwaping;
  }

  set isSwaping(value) {
    this.#isSwaping = value;
  }

  get isMoving() {
    return this.#isMoving;
  }

  set isMoving(value) {
    this.#isMoving = value;
  }

  increasePlayerPoints(points) {
    this.#playerPoints += points;
  }

  decreasePointsMovement() {
    this.#leftMovement--;
  }

  increasePointsMovement() {
    this.#leftMovement++;
  }

  isPlayerWinner() {
    return this.#playerPoints >= this.#pointsToWin ? true : false;
  }
}
