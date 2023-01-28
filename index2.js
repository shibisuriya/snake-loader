import { getContainer } from "./utils.js";
import SnakeSpinner from "./snakeSpinner.js";
const cellSize = "20px";
const columns = 15;
const rows = 15;
const container = getContainer();
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
