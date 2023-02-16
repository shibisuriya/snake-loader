import exceptions from './exceptions.js';

export default class Score {
	constructor({ helpers, score }) {
		this.helpers = helpers;
		this.score = score;
		this.addElement();
	}
	increment(score = 1) {
		this.score += score;
		this.updateScore();
	}
	decrement(score = 1) {
		if (score <= this.score) {
			this.score -= score;
			this.updateScore();
		} else {
			throw exceptions.negativeScore;
		}
	}
	updateScore() {
		this.element.innerText = String(this.score);
	}
	addElement() {
		this.element = document.createElement('div');
		this.element.innerText = String(this.score);
		Object.assign(this.element.style, {
			position: 'absolute',
			fontFamily: '"digit-clock", sans-serif',
			top: '6px',
			right: '6px',
			zIndex: '999',
			color: 'white',
			backgroundColor: 'black',
			padding: '3px',
			borderRadius: '10px',
		});
		this.helpers.getContainer().appendChild(this.element);
	}
	getElement() {
		return this.element;
	}
}
