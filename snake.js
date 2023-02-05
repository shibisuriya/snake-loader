import OrderedHash from './orderedHash.js';
export default class Snake {
	// The MVC architecture's model of the snake is handled by this class.
	constructor({ helpers, grid }) {
		this.grid = grid;
		this.helpers = helpers;
		this.initializeSnake();
	}
	initializeSnake() {
		this.isGameOver = false;
		this.direction = this.moveBottom; // Snake's initial direction is 'right'.
		this.snake = new OrderedHash({
			list: [
				[0, 7], // The head peice is the first element of the array.
				[0, 6],
				[0, 5],
				[0, 4],
				[0, 3],
				[0, 2],
				[0, 1],
				[0, 0],
			],
			columns: this.helpers.getColumns(),
			rows: this.helpers.getRows(),
		});
		this.updateView();
	}
	isPartOfSnake(x, y) {
		return !!this.snake.get(x, y);
	}
	perish() {}
	next() {
		// Change 'head' into 'neck'.
		const head = this.snake.getHead();
		const newHead = this.direction(...head);

		// Make sure the snake hasn't bitten itself.
		if (this.isPartOfSnake(...newHead)) {
			throw new Error('Error: The snake has bitten itself.');
		} else {
			this.snake.unshift(...newHead);
		}
		this.grid.getCell(...head).set(['snake-body-cell', 'snake-cell']);
		this.grid.getCell(...newHead).set(['snake-head-cell', 'snake-cell']);

		// Create the illusion of movement by cutting off the tail of the snake.
		const tail = this.snake.getTail();
		this.snake.remove(...tail); // Remove tail, that is, the last piece.
		this.grid.getCell(...tail).reset();
	}
	resetView() {
		this.snake.forEach((s) => {
			this.grid.getCell(...s).reset();
		});
	}
	updateView() {
		const [head, ...body] = this.snake.getArray();
		this.grid.getCell(...head).set(['snake-head-cell', 'snake-cell']);
		body.forEach((s) => {
			this.grid.getCell(...s).set(['snake-body-cell', 'snake-cell']);
		});
	}
	changeDirection(direction) {
		const oppositeDirection = this.getOppositeDirection();
		switch (direction) {
			case 'left':
				if (oppositeDirection != this.moveLeft) {
					this.direction = this.moveLeft;
				} else {
					throw new Error('Error: You are trying to move in the opposite direction.');
				}
				break;
			case 'right':
				if (oppositeDirection != this.moveRight) {
					this.direction = this.moveRight;
				} else {
					throw new Error('Error: You are trying to move in the opposite direction.');
				}
				break;
			case 'top':
				if (oppositeDirection != this.moveTop) {
					this.direction = this.moveTop;
				} else {
					throw new Error('Error: You are trying to move in the opposite direction.');
				}
				break;
			case 'bottom':
				if (oppositeDirection != this.moveBottom) {
					this.direction = this.moveBottom;
				} else {
					throw new Error('Error: You are trying to move in the opposite direction.');
				}
				break;
			default:
				throw new Error('Error: Invalid direction');
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
		if (y > 0) {
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
	getCells() {
		return this.snake.getOrderedHash();
	}

	/**
	 * This function determines if the two directions passed as arguments are opposite to each other or not.
	 * @param {*} d1 - Direction 1
	 * @param {*} d2 - Direction 2
	 */
	getOppositeDirection() {
		const head = this.snake.getHead();
		const neck = this.snake.getNeck();
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
			throw new Error('Error: Snake data is corrpt.');
		}
	}
}
