export default class Grid {
  // The 'Grid' class is tightly coupled with the 'SnakeSpinner' class.
  constructor({ cellSize, columns, rows, container }) {
    this.cellSize = cellSize;
    this.columns = columns;
    this.rows = rows;
    this.container = container;
    this.makeContainerRelative();
    this.makeGrid();
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
  setCell(x, y) {
    const cell = this.getCell(x, y);
    cell.classList.add("snake-body-cell");
  }
  resetCell(x, y) {
    const cell = this.getCell(x, y);
    cell.classList.remove("snake-body-cell");
  }
  getCell(x, y) {
    const className = this.generateClassName(x, y);
    const [cell] = this.getContainer().getElementsByClassName(className);
    return cell;
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