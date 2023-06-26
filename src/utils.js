import exceptions from './exceptions.js';
export const getContainer = () => {
	const [container] = document.getElementsByClassName('container');
	return container;
};

/**
 * Generates a unique key based on the given x and y coordinates.
 *
 * @param {number} i - The x coordinate.
 * @param {number} j - The y coordinate.
 * @returns {string} The generated unique key.
 * @throws Will throw an error if either i is more than the number of columns or j is more than the number of rows.
 */
export const generateKey = (i, j, columns, rows) => {
	if (i > columns || j > rows) {
		throw exceptions.invalidCoordinates(i, j);
	}
	return `${i}-${j}`;
};

export const getDimension = (el) => {
	return el.getBoundingClientRect();
};

export const dummyAPI = (url, { min = 5, max = 6 } = {}) => {
	return new Promise((resolve, reject) => {
		const randomNumber = generateRandomNumber(min, max);
		setTimeout(() => {
			resolve({
				image: './assets/images/flowers.jpeg',
			});
		}, randomNumber * 1000);
	});
};

const generateRandomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomIntFromInterval = (min, max) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
};
