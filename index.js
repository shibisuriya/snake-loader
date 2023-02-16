import { getContainer, dummyAPI } from "./utils.js";
import SnakeSpinner from "./snakeSpinner.js";
const cellSize = "20px";
const columns = 15;
const rows = 15;
const container = getContainer();
const speed = 0.3;
const snakeSpinner = new SnakeSpinner({
  container,
  columns,
  rows,
  cellSize,
  speed,
  scorePerFoodPiece: 5,
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
snakeSpinner.show();
dummyAPI("https://www.dummy-url.com").then((resp) => {
  if (resp) {
    snakeSpinner.hide();
  }
});
