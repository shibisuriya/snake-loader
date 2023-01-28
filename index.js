import { getContainer } from "./utils.js";
const rows = 60;
const columns = 60;
const container = getContainer();
const squareSize = "30px";
for (let i = 0; i < 300; i += parseInt(squareSize)) {
  for (let j = 0; j < 300; j += parseInt(squareSize)) {
    const square = document.createElement("div");
    Object.assign(square.style, {
      left: `${i}px`,
      top: `${j}px`,
      width: squareSize,
      height: squareSize,
      position: "absolute",
      boxSizing: "border-box",
    });
    container.appendChild(square);
  }
}
const getCell = (x, y) => {


}
const snake = [
  [3, 1],
  [2, 1],
  [1, 1],
];
setInterval(() => {
  console.log("set interval");
}, 1 * 1000);
