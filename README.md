# Snake Spinner

A progress-spinner that transforms into a snake game when the user interacts with it.

<center>

![](https://github.com/shibisuriya/snake-spinner/blob/master/demo/1.gif)
</center>

## Introduction

The Snake Spinner is a reusable component that serves as a visual indicator of loading or progress of a task. When the user interacts with it, the spinner transforms into a fully-playable snake game. The snake and food color can be customized to match the user's preference, making it a versatile addition to any project

## Installation

```bash
npm install snake-spinner
```

## Usage

```javascript
import SnakeSpinner from "snake-spinner";
const cellSize = "20px";
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
      border: "1px solid black",
      backgroundColor: "red",
    },
    snakeBody: {
      border: "1px solid green",
      backgroundColor: "black",
    },
    food: {
      border: "1px solid green",
      backgroundColor: "yellow",
    },
  },
});
snakeSpinner.show() // To hide the loading element and reveal the spinner. 

snakeSpinner.hide(); // To display the loaded element and conceal the spinner.

snakeSpinner.stop();
```

## Live demo

[Live demo](https://shibisuriya.github.io/snake-spinner/)

## License

This project is licensed under the MIT License.
