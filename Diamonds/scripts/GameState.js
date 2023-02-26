import { Diamond } from './Diamond.js';
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

  set playerPoints(points) {
    this.#playerPoints += points;
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

  decreasePointsMovement() {
    this.#leftMovement++;
  }

  increasePointsMovement() {
    this.#leftMovement--;
  }

  isPlayerWinner() {
    return this.#playerPoints >= this.#pointsToWin ? true : false;
  }
}
