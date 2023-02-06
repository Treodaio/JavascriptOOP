import { Common } from './Common.js'
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


}


export const canvas = new Canvas();