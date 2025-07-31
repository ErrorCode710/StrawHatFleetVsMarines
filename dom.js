// for update
import { Ship } from "./ship.js";
export function renderBoard(gameBoard, playerBoard) {
  const boardContainer = document.getElementById(playerBoard);
  console.log(boardContainer);
  boardContainer.innerHTML = ""; // Clear previous board

  for (let y = 0; y < gameBoard.board.length; y++) {
    for (let x = 0; x < gameBoard.board[y].length; x++) {
      const value = gameBoard.board[y][x];
      let classValue = "empty";

      if (value === 0) {
        classValue = "empty";
      } else if (value instanceof Ship) {
        classValue = "ship";
      } else if (value === "hit") {
        classValue = "hit";
      } else if (value === "miss") {
        classValue = "miss";
      }

      const tile = cell(y, x, classValue);

      boardContainer.appendChild(tile);
    }
  }
}

function cell(y, x, value) {
  const element = document.createElement("div");
  const dataset = (element.dataset.coord = `${y},${x}`);
  element.classList.add("gameBoard__cell", value);

  return element;
}
