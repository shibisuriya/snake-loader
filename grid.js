import Cell from './cell.js';
import { generateKey } from './utils.js';
export default class Grid {
	// The 'Grid' class is tightly coupled with the 'SnakeSpinner' class.
	// The MVC architecture's view is handled by this class.
	constructor({ helpers }) {
		console.log(helpers);
		this.helpers = helpers;
		this.cells = {};
		this.makeContainerRelative();
		this.createGrid();
	}
	createGrid() {
		for (let i = 0; i < this.helpers.getColumns(); i++) {
			for (let j = 0; j < this.helpers.getRows(); j++) {
				const pos = {
					left: `${i * parseInt(this.helpers.getCellSize())}px`,
					top: `${j * parseInt(this.helpers.getCellSize())}px`,
				};
				const id = {
					x: i,
					y: j,
				};
				const cell = new Cell({
					pos,
					id,
					helpers: this.helpers,
				});
				const key = generateKey(i, j, this.helpers.getColumns(), this.helpers.getRows());
				this.cells[key] = cell;
			}
		}
	}

	/**
	 * Retrieves a cell object from the grid.
	 *
	 * @param {number} x - The x coordinate of the cell.
	 * @param {number} y - The y coordinate of the cell.
	 *
	 * @returns {Object} The cell object at the specified x and y coordinates.
	 */
	getCell(x, y) {
		const key = generateKey(x, y, this.helpers.getColumns(), this.helpers.getRows());
		return this.cells[key];
	}

	/**
	 * Assigns CSS classes to a cell element.
	 *
	 * @param {number} x - The x coordinate of the cell.
	 * @param {number} y - The y coordinate of the cell.
	 * @param {string[]} classes - An array of CSS classes to be assigned to the cell element.
	 */
	setCell(x, y, classes) {
		this.getCell(x, y).set(...classes);
	}

	/**
	 * Removes CSS classes from a cell object.
	 *
	 * @param {number} x - The x coordinate of the cell.
	 * @param {number} y - The y coordinate of the cell.
	 */
	resetCell(x, y) {
		this.getCell(x, y).reset();
	}

	/**
	 * Changes the position of the container HTML element to relative.
	 */
	makeContainerRelative() {
		const container = this.helpers.getContainer();
		this.originContainerPosition = container.style.position; // TODO: Make sure that this doesn't change on writing to style.position.
		container.style.position = 'relative';
	}

	/**
	 * Resets the position of the container element to its original state before the snake-spinner was initialized.
	 */
	resetContainerPosition() {
		this.helpers.getContainer().style.position = this.originContainerPosition;
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
	getCells() {
		return this.cells;
	}
	destory() {
		this.resetContainerPosition();
	}
}
