import Grid from './grid.js';
import OrderedHash from './orderedHash.js';
import Snake from './snake.js';
import { randomIntFromInterval } from './utils.js';
import Score from './score.js';
import exceptions from './exceptions.js';
export default class SnakeSpinner {
	// The MVC architecture's controller is handled by this class.
	constructor({ container, cellSize, columns, rows, speed = 2, scorePerFoodPiece = 5 } = {}) {
		this.container = container;
		this.cellSize = cellSize;
		this.columns = columns;
		this.rows = rows;
		this.speed = speed;
		this.scorePerFoodPiece = scorePerFoodPiece;
		this.helpers = {
			getCellSize: this.getCellSize.bind(this),
			getColumns: this.getColumns.bind(this),
			getRows: this.getRows.bind(this),
			getContainer: this.getContainer.bind(this),
		};
		this.grid = new Grid({
			helpers: this.helpers,
		});
		this.foods = new OrderedHash();
		this.snake = new Snake({ helpers: this.helpers, grid: this.grid, foods: this.foods });
		this.score = new Score({ helpers: this.helpers, score: 0 });
		this.registerKeyboard();
		this.startTimer();
	}
	stopGame() {
		this.stopTimer();
		this.deregisterKeyboard();
	}
	incrementScore() {
		this.score.increment(this.scorePerFoodPiece);
	}
	snakeNextMove() {
		try {
			this.snake.next();
		} catch (err) {
			console.error(err);
			this.stopGame();
		}
	}
	startTimer() {
		this.timer = setInterval(() => {
			this.snakeNextMove();
			try {
				this.spawnFood();
			} catch (err) {
				console.error(err);
				this.stopGame();
			}
		}, this.speed * 1000);
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
	changeDirection(direction) {
		try {
			this.snake.changeDirection(direction);
			this.snakeNextMove();
		} catch (err) {
			console.error(err);
		}
	}
	registerKeyboard() {
		this.abortController = new AbortController();
		window.addEventListener(
			'keydown',
			(({ key }) => {
				switch (key) {
					case 'w':
					case 'W':
					case 'ArrowUp':
						this.changeDirection('top');
						break;
					case 's':
					case 'S':
					case 'ArrowDown':
						this.changeDirection('bottom');
						break;
					case 'a':
					case 'A':
					case 'ArrowLeft':
						this.changeDirection('left');
						break;
					case 'd':
					case 'D':
					case 'ArrowRight':
						this.changeDirection('right');
						break;
				}
			}).bind(this),
			{ signal: this.abortController.signal },
		);
	}
	spawnFood() {
		const grid = this.grid.getCells();
		const snake = this.snake.getCells();
		const foods = this.foods.getOrderedHash();
		const unoccupiedCells = Object.keys(grid).filter((cell) => {
			return !(snake[cell] || foods[cell]);
		});
		if (unoccupiedCells.length > 0) {
			// There must be atleast 1 unoccupied cell in the grid to spawn a food.
			const randomNumber = randomIntFromInterval(0, unoccupiedCells.length - 1);
			const key = unoccupiedCells[randomNumber];
			const food = grid[key].getData();
			this.foods.push(...food);
			this.grid.setCellUsingKey(key, ['snake-food']);
		} else {
			throw exceptions.gridFull;
		}
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
}
