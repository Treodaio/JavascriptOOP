import { Sprite } from "./Sprite.js";
import { GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from "./gameConstants.js";

export const DIAMOND_SIZE = 48;
export const NUMBER_OF_DIAMOND_TYPES = 6;

const DIAMOND_ORIGINAL_SIZE = 32;
const DIAMOND_ZOOM = DIAMOND_SIZE / DIAMOND_ORIGINAL_SIZE;

export class Diamond extends Sprite {
  constructor(x, y, row, column, kind, diamondSpriteImage) {
    const offset = {
      x: GAME_BOARD_X_OFFSET,
      y: GAME_BOARD_Y_OFFSET,
    };
    super(
      x,
      y,
      DIAMOND_ORIGINAL_SIZE,
      DIAMOND_ORIGINAL_SIZE,
      diamondSpriteImage,
      NUMBER_OF_DIAMOND_TYPES,
      offset
    );
    this.row = row;
    this.column = column;
    this.kind = kind;
    this.match = 0;
  }

  draw() {
    // przekazujemy typ a parametr jest używany do obliczania ilości wyrysowanych diamentów,
    super.draw(this.kind, DIAMOND_ZOOM);
  }
}
