# Snake Spinner

A progress-spinner that transforms into a snake game when the user interacts with it.

<center>

![](https://github.com/shibisuriya/snake-spinner/blob/master/demo/1.gif)
</center>

## Introduction

The Snake Spinner is a reusable component that serves as a visual indicator of loading or progress of a task. When the user interacts with it, the spinner transforms into a fully-playable snake game. The snake and food color can be customized to match the user's preference, making it a versatile addition to any project

## Inspiration Behind the Project
While investigating ways to improve the performance of a front-end web application over the weekend, I came across an unusual category of techniques that allows designers and developers to create the illusion of fast performance without actually enhancing the performance of the web application. While browsing the internet, I stumbled upon a story in which employees working in a corporate office with 15 floors were constantly complaining about the slow speed of the elevator. After receiving numerous complaints about the elevator's speed, instead of increasing its speed or fixing its algorithm, the building owner decided to install large mirrors inside the elevators. As a result, the employees stopped complaining about the elevator's speed, even though the building owner never actually improved the speed of the elevator. The employee's complaints about the speed of the elevators ceased because the mirrors served as a distraction, thereby reducing boredom and complaints about the time spent in the lift. Software companies that develop products consumed by a large number of people take advantage of this phenomenon. An example of this concept is the dinosaur game in Google Chrome, which is activated when there is no internet connection, to discourage the users from closing the program or switching to a different program while they are waiting for the internet to come back up. I recently learned HTML, CSS, and JavaScript by doing a Udemy course, and decided to apply the knowledge I gained by creating a simple progress spinner that transforms into a snake game when interacted with by the user. This concept has been used before by YouTube back in the days, so it's not a new idea, but what makes this project fun is that the spinner is reusable, with exposed APIs that allow developers to customize and tweak it.

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

## Trivia
The snake's default design was inspired by Nothings's design concept.

## License
This project is licensed under the MIT License.
