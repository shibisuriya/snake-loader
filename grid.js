export default class Grid {
  // The 'Grid' class is tightly coupled with the 'SnakeSpinner' class.
  constructor({ cellSize, columns, rows, container }) {
    this.cellSize = cellSize;
    this.columns = columns;
    this.rows = rows;
    this.container = container;
    this.makeContainerRelative();
    this.makeGrid();
    this.initScore();
  }
  makeGrid() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const cell = document.createElement("div");
        const left = `${i * parseInt(this.cellSize)}px`;
        const top = `${j * parseInt(this.cellSize)}px`;
        Object.assign(cell.style, {
          left,
          top,
          width: this.cellSize,
          height: this.cellSize,
          position: "absolute",
          boxSizing: "border-box",
        });
        cell.className = this.generateClassName(i, j); // Allows random access using getElementsByClassName().
        this.getContainer().appendChild(cell);
      }
    }
  }
  initScore() {
    const score = document.createElement("div");
    this.score = 0;
    Object.assign(score.style, {
      position: "absolute",
      top: "2px",
      right: "2px",
    });
    score.className = "game-score";
    this.getContainer().appendChild(score);
  }
  incrementScore(score = 1) {
    this.score += score;
    this.updateScore();
  }
  decrementScore(score = 1) {
    if (this.score >= score) {
      this.score -= score;
    }
    this.updateScore();
  }
  getCell(x, y) {
    const className = this.generateClassName(x, y);
    const [cell] = this.getContainer().getElementsByClassName(className);
    return cell;
  }
  setHead(x, y) {
    this.resetBody(x, y);
    const cell = this.getCell(x, y);
    cell.classList.add("snake-cell", "snake-head-cell");
  }
  resetHead(x, y) {
    const cell = this.getCell(x, y);
    cell.classList.remove("snake-cell", "snake-head-cell");
  }
  setBody(x, y) {
    this.resetHead(x, y);
    const cell = this.getCell(x, y);
    cell.classList.add("snake-cell", "snake-body-cell");
  }
  resetBody(x, y) {
    const cell = this.getCell(x, y);
    cell.classList.remove("snake-cell", "snake-body-cell");
  }
  makeContainerRelative() {
    this.originContainerPosition = this.getContainer().style.position; // TODO: Make sure that this doesn't change on writing to style.position.
    this.getContainer().style.position = "relative";
  }
  resetContainerPosition() {
    this.getContainer().style.position = this.originContainerPosition;
  }
  generateClassName(x, y) {
    return `pos(${x}, ${y})`;
  }
  getContainer() {
    return this.container;
  }
  getCellSize() {
    return this.cellSize;
  }
  getRows() {
    return this.rows;
  }
  getColumns() {
    return this.columns;
  }
  onDestory() {
    this.resetContainerPosition();
  }
}