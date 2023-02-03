export default class Cell {
  constructor({ pos, id, cellSize, helpers }) {
    // The 'Cell' class is tightly couple with the 'Grid' class.
    this.helpers = helpers;
    this.pos = pos;
    this.id = id;
    this.cellSize = cellSize;
    this.createCell();
  }
  createCell() {
    const cell = document.createElement("div");
    const { left, top } = this.pos;
    Object.assign(cell.style, {
      left,
      top,
      width: this.cellSize,
      height: this.cellSize,
      position: "absolute",
      boxSizing: "border-box",
    });
    this.element = cell;
    this.helpers.getContainer().appendChild(cell);
  }
  set(...classes) {
    this.reset();
    this.getElement().classList.add(...classes);
  }
  reset() {
    const cellElement = this.getElement();
    const classList = Array.from(cellElement.classList);
    cellElement.classList.remove(...classList);
  }
  getElement() {
    return this.element;
  }

  getId() {
    const { x, y } = this.pos;
    return { x, y };
  }
}
