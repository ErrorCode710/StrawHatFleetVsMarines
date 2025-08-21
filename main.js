import { Player } from "./scripts/player.js";
import { handlePlayerNameEntry, showPhase, buildSetUpBoard, setUpBoard } from "./scripts/dom.js";
import { GameManager } from "./scripts/gameManager.js";
import { GameBoard } from "./scripts/gameboard.js";

const player1Board = document.querySelector("#player2"); // player1 attacks player2's board
const player2Board = document.querySelector("#player1"); // player2 attacks player1's board

// const gameManager = new GameManager();
// document.querySelector("#pva").addEventListener("click", () => {
//   handlePlayerNameEntry("Player 1");
//   gameManager.startGame();
// });

// document.querySelector("#pvp").addEventListener("click", () => {
//   handlePlayerNameEntry("Player 1");
//   gameManager.startGame();
// });

// [player1Board, player2Board].forEach((board) => {
//   board.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("gameBoard__cell")) return;
//     if (e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

//     const coord = e.target.dataset.coord;
//     const [y, x] = coord.split(",").map(Number);

//     const isPlayer1Turn = gameManager.currentPlayer === gameManager.player1;
//     console.log(isPlayer1Turn);
//     console.log(board, player1Board);

//     const isCorrectBoard = (isPlayer1Turn && board === player1Board) || (!isPlayer1Turn && board === player2Board);
//     console.log("Im here");
//     if (!isCorrectBoard) return;
//     console.log("Im here too");

//     gameManager.gameLoop(y, x);
//   });
// });

/*

The error occurs when I hit the same coords with 

*/

let gameState = {
  state: "menu",
  mode: null,
  fleetName: "StrawHat",
};

let shipInfo = [];

showPhase(gameState, "menu");

document.querySelectorAll(".home__button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    gameState.mode = e.target.dataset.mode;

    showPhase(gameState, "name-entry");
    // handlePlayerNameEntry(gameState.mode, "Player 1");
  });
});

// Player One Name Entry and Board Setup
document.querySelector(".player-name__form").addEventListener("submit", (e) => {
  e.preventDefault();
  // grab values
  gameState.fleetName = e.target.player1Name.value.trim();
  showPhase(gameState, "board-setup");
  setUpBoard();
});

document.querySelectorAll(".board-setup__ship-card").forEach((card) => {
  const type = card.dataset.shipType;
  console.log(type); // "Carrier", "Battleship", etc.
});

// // just get the coordinates and dynamically input on the placeship
// i create an array of object for the coordinates for example like this [{shipType: Carrier, Coordinates: [2,2], Axis: "Y"}, {shipType: Destroyer, Coordinates: [2,2], Axis: "Y"}]
// if i click or d