import Grid from "./grid.js";
export default class SnakeSpinner {
  constructor({ container, cellSize, columns, rows, speed = 2, style } = {}) {
    this.speed = speed;
    this.grid = new Grid({
      cellSize,
      columns,
      rows,
      container,
    });
    this.initializeSnake();
    this.registerKeyboard();
    this.startTimer();
  }
  onDestory() {
    this.grid.onDestory();
    this.deregisterKeyboard();
    this.stopTimer();
  }
  show() {}
  hide() {}
  spawnFood() {
    const rows = this.grid.rows();
    const columns = this.grid.columns();
    // We need to generate two random numbers, within the range of 0 to the number of rows and columns, respectively.
  }
  initializeSnake() {
    this.currentDirection = this.moveRight; // The snake moves in right direction when the game starts.
    this.snake = [
      [7, 0],
      [6, 0],
      [5, 0],
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ];

    const [head, ...body] = this.snake;
    this.grid.setHead(...head);
    body.forEach((piece) => {
      this.grid.setBody(...piece);
    });
  }
  registerKeyboard() {
    this.abortController = new AbortController();
    window.addEventListener(
      "keydown",
      (({ key }) => {
        console.log(key);
        switch (key) {
          case "w":
          case "W":
          case "ArrowUp":
            if (
              !this.isOppositeDirection(this.currentDirection, this.moveTop)
            ) {
              this.currentDirection = this.moveTop;
              this.move();
            }
            break;
          case "s":
          case "S":
          case "ArrowDown":
            if (
              !this.isOppositeDirection(this.currentDirection, this.moveBottom)
            ) {
              this.currentDirection = this.moveBottom;
              this.move();
            }
            break;
          case "a":
          case "A":
          case "ArrowLeft":
            if (
              !this.isOppositeDirection(this.currentDirection, this.moveLeft)
            ) {
              this.currentDirection = this.moveLeft;
              this.move();
            }
            break;
          case "d":
          case "D":
          case "ArrowRight":
            if (
              !this.isOppositeDirection(this.currentDirection, this.moveRight)
            ) {
              this.currentDirection = this.moveRight;
              this.move();
            }

            break;
        }
      }).bind(this),
      { signal: this.abortController.signal }
    );
  }
  deregisterKeyboard() {
    this.abortController.abort();
  }
  startTimer() {
    this.timer = setInterval(this.move.bind(this), this.speed * 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  moveLeft(x, y) {
    if (x > 0) {
      return [--x, y];
    } else {
      alert("You have hit the left wall.");
    }
  }
  moveRight(x, y) {
    if (x < this.grid.getColumns()) {
      return [++x, y];
    } else {
      alert("You have hit the right wall.");
    }
  }
  moveTop(x, y) {
    if (x > 0) {
      return [x, --y];
    } else {
      alert("You have hit the top wall.");
    }
  }
  moveBottom(x, y) {
    if (x < this.grid.getRows()) {
      return [x, ++y];
    } else {
      alert("You have hit the bottom wall.");
    }
  }
  move() {
    const [head] = this.snake;
    this.grid.setBody(...head);
    const [x, y] = this.currentDirection(...head);
    this.snake.unshift([x, y]);
    this.grid.setHead(x, y);

    const tail = this.snake.pop();
    this.grid.resetBody(...tail);
    console.log(this.snake);
  }
  /**
   * This function determines if the two directions passed as arguments are opposite to each other or not.
   * @param {*} d1 - Direction 1
   * @param {*} d2 - Direction 2
   */
  isOppositeDirection(d1, d2) {
    // Sloppy, but fast  :)
    if (d1 == this.moveLeft && d2 == this.moveRight) {
      return true;
    } else if (d1 == this.moveRight && d2 == this.moveLeft) {
      return true;
    } else if (d1 == this.moveTop && d2 == this.moveBottom) {
      return true;
    } else if (d1 == this.moveBottom && d2 == this.moveTop) {
      return true;
    } else {
      return false;
    }
  }
}
