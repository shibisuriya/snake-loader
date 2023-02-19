import exceptions from './exceptions.js';
import OrderedHash from './orderedHash.js';
import { MODES } from './constants.js';
export default class Snake {
	// The MVC architecture's model of the snake is handled by this class.
	constructor({ helpers, grid, foods }) {
		this.grid = grid;
		this.foods = foods;
		this.helpers = helpers;
		this.initializeSnake();
	}
	getSnake() {
		return this.snake
	}
	initializeSnake() {
		this.isGameOver = false;
		this.direction = this.moveRight; // Snake's initial direction is 'top'.
		const x = this.helpers.getColumns() / 2 - 1; // 'columns' should always be even.
		const y = this.helpers.getRows() / 2 - 1; // 'rows' should always be even.
		const snake = [
			[x, y],
			[x, y + 1],
			[x + 1, y + 1],
			[x + 1, y],
		];
		this.snake = new OrderedHash({
			list: snake,
			columns: this.helpers.getColumns(),
			rows: this.helpers.getRows(),
		});
		this.updateView();
	}
	isPartOfSnake(x, y) {
		return !!this.snake.get(x, y);
	}
	perish() {}
	breakout() {
		// The snakeSpinner is in 'spinner' mode right now.
		this.helpers.setMode('game');
		switch (this.direction) {
			case this.moveBottom:
				this.changeDirection(this.moveTop);
				break;
			case this.moveTop:
				this.changeDirection(this.moveBottom);
				break;
			case this.moveLeft:
				this.changeDirection(this.moveRight);
				break;
			case this.moveRight:
				this.changeDirection(this.moveLeft);
				break;
		}
	}
	spin() {
		const tail = this.snake.getTail();
		this.snake.remove(...tail);
		const head = this.snake.getHead();
		const newHead = this.direction(...head);
		this.snake.unshift(...newHead);
		this.grid.getCell(...head).set(['snake-body-cell', 'snake-cell']);
		this.grid.getCell(...newHead).set(['snake-head-cell', 'snake-cell']);
		const nextDirection = this.getNextClockwiseDirection(this.direction);
		this.changeDirection(nextDirection);
	}
	next() {
		const mode = this.helpers.getMode();
		// Change 'head' into 'neck'.
		const head = this.snake.getHead();
		const newHead = this.direction(...head);

		// Make sure the snake hasn't bitten itself.
		if (this.isPartOfSnake(...newHead)) {
			throw exceptions.selfBite;
		} else {
			this.snake.unshift(...newHead);
		}
		this.grid.getCell(...head).set(['snake-body-cell', 'snake-cell']);
		this.grid.getCell(...newHead).set(['snake-head-cell', 'snake-cell']);

		if (!this.foods.get(...newHead)) {
			// Create the illusion of movement by cutting off the tail of the snake.
			const tail = this.snake.getTail();
			this.snake.remove(...tail); // Remove tail, that is, the last piece.
			this.grid.getCell(...tail).reset();
		} else {
			this.foods.remove(...newHead);
			throw exceptions.foodEaten;
		}
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
			case this.moveLeft:
				if (oppositeDirection != this.moveLeft) {
					this.direction = this.moveLeft;
				} else {
					throw exceptions.oppositeDirection;
				}
				break;
			case 'right':
			case this.moveRight:
				if (oppositeDirection != this.moveRight) {
					this.direction = this.moveRight;
				} else {
					throw exceptions.oppositeDirection;
				}
				break;
			case 'top':
			case this.moveTop:
				if (oppositeDirection != this.moveTop) {
					this.direction = this.moveTop;
				} else {
					throw exceptions.oppositeDirection;
				}
				break;
			case 'bottom':
			case this.moveBottom:
				if (oppositeDirection != this.moveBottom) {
					this.direction = this.moveBottom;
				} else {
					throw exceptions.oppositeDirection;
				}
				break;
			default:
				throw exceptions.invalidDirection;
		}
	}
	moveLeft(x, y) {
		if (x > 0) {
			return [--x, y];
		} else {
			throw exceptions.ranIntoLeftWall;
		}
	}
	moveRight(x, y) {
		if (x < this.helpers.getColumns() - 1) {
			return [++x, y];
		} else {
			throw exceptions.ranIntoRightWall;
		}
	}
	moveTop(x, y) {
		if (y > 0) {
			return [x, --y];
		} else {
			throw exceptions.ranIntoTopWall;
		}
	}
	moveBottom(x, y) {
		if (y < this.helpers.getRows() - 1) {
			return [x, ++y];
		} else {
			throw exceptions.ranIntoBottomWall;
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
			throw exceptions.corruptSnakeData;
		}
	}
	getNextClockwiseDirection(currentDirection) {
		switch (currentDirection) {
			case this.moveBottom:
				return this.moveLeft;
			case this.moveTop:
				return this.moveRight;
			case this.moveLeft:
				return this.moveTop;
			case this.moveRight:
				return this.moveBottom;
			default:
				throw exceptions.invalidDirection;
		}
	}
	getNextAntiClockwiseDirection(currentDirection) {
		switch (currentDirection) {
			case this.moveBottom:
				return this.moveRight;
			case this.moveTop:
				return this.moveLeft;
			case this.moveLeft:
				return this.moveBottom;
			case this.moveRight:
				return this.moveTop;
			default:
				throw exceptions.invalidDirection;
		}
	}
}
