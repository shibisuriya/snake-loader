import { getContainer } from "./utils.js";
class Snake {
  constructor({ container, cellSize, columns, rows, delay = 0.5 } = {}) {
    this.columns = columns;
    this.rows = rows;
    this.cellSize = cellSize;
    this.container = container;
    this.direction = "r";
    this.delay = delay;
    this.snake = [
      [2, 0],
      [1, 0],
      [0, 0],
    ];
    0;

    this.initGrid({ cellSize, columns, rows });
    this.startTimer();
    this.registerKeyboard();
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
            this.direction = "t";
            break;
          case "s":
          case "S":
            this.direction = "b";
            break;
          case "a":
          case "A":
            this.direction = "l";
            break;
          case "d":
          case "D":
            console.log("d");
            this.direction = "r";
            break;
        }
      }).bind(this),
      { signal: this.abortController.signal }
    );
  }
  unsubscribeKeyboard() {
    this.abortController.abort();
  }
  startTimer() {
    this.timer = setInterval(this.move.bind(this), this.delay * 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  snakeMove(x, y) {
    switch (this.direction) {
      case "l":
        return this.moveLeft(x, y);
      case "r":
        return this.moveRight(x, y);
      case "t":
        return this.moveTop(x, y);
      case "b":
        return this.moveBottom(x, y);
    }
  }
  moveLeft(x, y) {
    if (x > 0) {
      return [--x, y];
    } else {
      alert("You have hit the left wall.");
    }
  }
  moveRight(x, y) {
    if (x < this.columns) {
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
    if (x < this.rows) {
      return [x, ++y];
    } else {
      alert("You have hit the bottom wall.");
    }
  }
  move() {
    this.snake.forEach((s) => {
      const [x, y] = s;
      const cell = this.getCell(x, y);
      cell.classList.remove("snake-body-part");
    });
    const [head] = this.snake;
    this.snake.pop();
    const [x, y] = this.snakeMove(head[0], head[1]);
    this.snake.unshift([x, y]);
    this.snake.forEach((s) => {
      const [x, y] = s;
      const cell = this.getCell(x, y);
      cell.classList.add("snake-body-part");
    });
  }
  getContainer() {
    return this.container;
  }
  getCell(x, y) {
    const className = `pos(${x}, ${y})`;
    const container = getContainer();
    const [cell] = container.getElementsByClassName(className);
    return cell;
  }
  initGrid({ cellSize, columns, rows }) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const square = document.createElement("div");
        const x = `${i * parseInt(cellSize)}px`;
        const y = `${j * parseInt(cellSize)}px`;
        Object.assign(square.style, {
          left: x,
          top: y,
          width: cellSize,
          height: cellSize,
          position: "absolute",
          boxSizing: "border-box",
        });
        square.className = `pos(${i}, ${j})`;
        container.appendChild(square);
      }
    }
  }
}
const cellSize = "20px";
const columns = 15;
const rows = 15;
const container = getContainer();
const snake = new Snake({ container, columns, rows, cellSize });
