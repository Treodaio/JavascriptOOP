import { Common } from './Common.js';
import { media } from './Media.js';


export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;

const HTML_CANVAS_ID = 'js-game-screen';

class Canvas extends Common {
  constructor() {
    super(HTML_CANVAS_ID);
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.context = this.element.getContext('2d');
    this.context.canvas.width = CANVAS_WIDTH;
    this.context.canvas.height = CANVAS_HEIGHT;
    this.context.font = '20px Arial white';
    this.context.fillStyle = 'white';
  }

  drawGameOnCanvas(gameState) {
    this.drawBackground();
    this.drawPointsToWin(gameState.points);
    this.drawPlayerPoints(gameState.getPlayerPoints());
    this.drawLeftMovement(gameState.getMovementLeft());
  }

  drawBackground() {
    this.context.drawImage(media.backgroundImage, 0, 0);
  }

  drawPointsToWin(points) {
    this.context.fillText(points, 520, 92)
  }
  drawPlayerPoints(points) {
    this.context.fillText(points, 520, 163)
  }
  drawLeftMovement(movement) {
    this.context.fillText(movement, 520, 234)
  }

}


export const canvas = new Canvas();
