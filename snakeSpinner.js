import Grid from "./grid.js";
import Snake from "./snake.js";
export default class SnakeSpinner {
  // The MVC architecture's controller is handled by this class.
  constructor({ container, cellSize, columns, rows, speed = 2 } = {}) {
    this.container = container;
    this.cellSize = cellSize;
    this.columns = columns;
    this.rows = rows;
    this.speed = speed;
    this.helpers = {
      getCellSize: this.getCellSize.bind(this),
      getColumns: this.getColumns.bind(this),
      getRows: this.getRows.bind(this),
      getContainer: this.getContainer.bind(this),
    };
    this.grid = new Grid({
      helpers: this.helpers,
    });
    this.snake = new Snake({ helpers: this.helpers, grid: this.grid });
    this.registerKeyboard();
    this.startTimer();
  }
  startTimer() {
    this.timer = setInterval(() => {
      try {
        this.snake.next();
      } catch (err) {
        console.error(err);
        this.stopTimer();
        this.deregisterKeyboard();
      }
    }, this.getSpeed() * 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  deregisterKeyboard() {
    this.abortController.abort();
  }
  onDestory() {
    this.grid.onDestory();
    this.snake.destroy();
  }
  registerKeyboard() {
    this.abortController = new AbortController();
    window.addEventListener(
      "keydown",
      (({ key }) => {
        switch (key) {
          case "w":
          case "W":
          case "ArrowUp":
            this.snake.changeDirection("top");
            this.snake.next();
            break;
          case "s":
          case "S":
          case "ArrowDown":
            this.snake.changeDirection("bottom");
            this.snake.next();
            break;
          case "a":
          case "A":
          case "ArrowLeft":
            this.snake.changeDirection("left");
            this.snake.next();
            break;
          case "d":
          case "D":
          case "ArrowRight":
            this.snake.changeDirection("right");
            this.snake.next();
            break;
        }
      }).bind(this),
      { signal: this.abortController.signal }
    );
  }
  spawnFood() {
    

  }
  show() {}
  hide() {}
  getContainer() {
    return this.container;
  }
  getCellSize() {
    return this.cellSize;
  }
  getColumns() {
    return this.columns;
  }
  getRows() {
    return this.rows;
  }
  getSpeed() {
    return this.speed;
  }
}
