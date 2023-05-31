# Snake Spinner

A progress-spinner that transforms into a snake game when the user interacts with it.

<center>

![](https://github.com/shibisuriya/snake-spinner/blob/master/demo/demo.gif)

</center>

## Introduction

The Snake Spinner is a reusable component that serves as a visual indicator of loading or progress of a task. When the user interacts with it, the spinner transforms into a fully-playable snake game. The snake and food color can be customized to match the user's preference, making it a versatile addition to any project

## Inspiration Behind the Project

During my recent exploration of ways to improve the performance of front-end web applications, I came across a fascinating category of techniques that can help designers and developers create the perception of fast performance, even without actually improving the application's speed. While browsing the internet, I stumbled upon a story in which employees working in a corporate office with a significant number of floors were constantly complaining about the slow speed of the elevator. After receiving numerous complaints about the elevator's speed, instead of increasing its speed, the building owner decided to install large mirrors inside the elevators. As a result, the employees stopped complaining about the elevator's speed, even though the building owner never actually improved the speed of the elevator. The employee's complaints about the speed of the elevators ceased because the mirrors served as a distraction, thereby reducing boredom and complaints about the time spent in the lift. Many companies have adopted similar techniques to enhance their software’s user experience. For example, the dinosaur game featured in Google Chrome is activated when there is no internet connection, keeping users engaged while they wait for the connection to resume. This reduces the likelihood of users closing or switching to a different program during the downtime. Over the weekend, I managed to quickly refactor a snake game that I had developed during my childhood, transforming it into a spinner that seamlessly transitions into the game when the user interacts with it.

## Installation

```bash
npm install snake-spinner
```

## Usage

```javascript
import SnakeSpinner from 'snake-spinner';
const cellSize = '20px';
const columns = 15;
const rows = 15;
const container = document.getElementById('container'); // The spinner will be added to the specified HTML element.
const speed = 0.5;
const snakeSpinner = new SnakeSpinner({
	container,
	columns,
	rows,
	cellSize,
	speed,
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
snakeSpinner.show(); // To hide the loading element and reveal the spinner.

snakeSpinner.hide(); // To display the loaded element and conceal the spinner.

snakeSpinner.stop();
```

## Live demo

[Live demo](https://shibisuriya.github.io/snake-loader/)

## License

This project is licensed under the MIT License.
