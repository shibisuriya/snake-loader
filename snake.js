export default class Snake {
  // The MVC architecture's model of the snake is handled by this class.
  constructor({ helpers, grid }) {
    this.grid = grid;
    this.helpers = helpers;
    this.isGameOver = false;
    this.initializeSnake();
    this.direction = this.moveBottom; // Snake's initial direction is 'right'.
  }
  initializeSnake() {
    this.snake = [
      [0, 7],
      [0, 6],
      [0, 5],
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1], // The head peice is the first element of the array.
      [0, 0],
    ];
    this.updateView();
    console.log(this.getOppositeDirection());
  }
  getHead() {
    const [head] = this.snake;
    return head;
  }
  getTail() {
    const tail = this.snake[this.snake.length - 1];
    return tail;
  }
  perish() {}
  next() {
    // Update model then view.
    this.grid.getCell(...this.getHead()).set(["snake-body-cell", "snake-cell"]);

    const newHead = this.direction(...this.getHead());
    this.snake.unshift([...newHead]);
    this.grid.getCell(...this.getHead()).set(["snake-head-cell", "snake-cell"]);

    this.grid.getCell(...this.getTail()).reset();
    this.snake.pop(); // Remove tail, that is, the last piece.
  }
  resetView() {
    this.snake.forEach((s) => {
      this.grid.getCell(...s).reset();
    });
  }
  updateView() {
    const [head, ...body] = this.snake;
    this.grid.getCell(...head).set(["snake-head-cell", "snake-cell"]);
    body.forEach((s) => {
      this.grid.getCell(...s).set(["snake-body-cell", "snake-cell"]);
    });
  }
  changeDirection(direction) {
    const oppositeDirection = this.getOppositeDirection();
    switch (direction) {
      case "left":
        if (oppositeDirection != this.moveLeft) {
          this.direction = this.moveLeft;
        } else {
          throw new Error(
            "Error: You are trying to move in the opposite direction."
          );
        }
        break;
      case "right":
        if (oppositeDirection != this.moveRight) {
          this.direction = this.moveRight;
        } else {
          throw new Error(
            "Error: You are trying to move in the opposite direction."
          );
        }
        break;
      case "top":
        if (oppositeDirection != this.moveTop) {
          this.direction = this.moveTop;
        } else {
          throw new Error(
            "Error: You are trying to move in the opposite direction."
          );
        }
        break;
      case "bottom":
        if (oppositeDirection != this.moveBottom) {
          this.direction = this.moveBottom;
        } else {
          throw new Error(
            "Error: You are trying to move in the opposite direction."
          );
        }
        break;
      default:
        throw new Error("Error: Invalid direction");
    }
  }
  moveLeft(x, y) {
    if (x > 0) {
      return [--x, y];
    } else {
      throw new Error("Error: You have hit the 'left' wall.");
    }
  }
  moveRight(x, y) {
    if (x < this.helpers.getColumns() - 1) {
      return [++x, y];
    } else {
      throw new Error("Error: You have hit the 'right' wall.");
    }
  }
  moveTop(x, y) {
    if (x > 0) {
      return [x, --y];
    } else {
      throw new Error("Error: You have hit the 'top' wall.");
    }
  }
  moveBottom(x, y) {
    if (y < this.helpers.getRows() - 1) {
      return [x, ++y];
    } else {
      throw new Error("Error: You have hit the 'bottom' wall.");
    }
  }

  /**
   * This function determines if the two directions passed as arguments are opposite to each other or not.
   * @param {*} d1 - Direction 1
   * @param {*} d2 - Direction 2
   */
  getOppositeDirection() {
    const [head, neck] = this.snake;
    const [headX, headY] = head;
    const [neckX, neckY] = neck;
    if (headY - neckY === 0 && Math.abs(headX - neckX) == 1) {
      // Horizontal directions.
      if (headX - neckX === 1) {
        return this.moveLeft;
      } else {
        return this.moveRight;
      }
    } else if (headX - neckX === 0 && Math.abs(headY - neckY) == 1) {
      // Vertical directions.
      if (headY - neckY === 1) {
        return this.moveTop;
      } else {
        return this.moveBottom;
      }
    } else {
      throw new Error("Error: Snake data is corrpt.");
    }
  }
}
