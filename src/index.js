import './assets/styles/styles.css';
import './assets/styles/animations.css';

import { getContainer, dummyAPI } from './utils.js';
import SnakeSpinner from './snakeSpinner.js';
const cellSize = '20px';
const columns = 50;
const rows = 20;
const container = getContainer();
const speed = 0.5;
const snakeSpinner = new SnakeSpinner({
	container,
	columns,
	rows,
	cellSize,
	speed,
	scorePerFoodPiece: 5,
	maximumFoodPieces: 5,
	style: {
		snakeHead: {
			border: '1px solid black',
			backgroundColor: 'red',
		},
		snakeBody: {
			border: '1px solid green',
			backgroundColor: 'black',
		},
		food: {
			border: '1px solid green',
			backgroundColor: 'yellow',
		},
	},
});
snakeSpinner.show();
dummyAPI('https://www.dummy-url.com').then((resp) => {
	const { image } = resp;
	if (image) {
		Object.assign(container.style, {
			backgroundImage: `url(${image})`,
			backgroundSize: 'cover',
		});
		snakeSpinner.hide();
	}
});
