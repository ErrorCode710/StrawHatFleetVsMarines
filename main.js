import { Player } from "./scripts/player.js";
import { handlePlayerNameEntry, showPhase } from "./scripts/dom.js";
import { GameManager } from "./scripts/gameManager.js";

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
};

showPhase(gameState, "menu");

document.querySelectorAll(".home__button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    gameState.mode = e.target.dataset.mode;
    console.log(e.target.dataset.mode);
    console.log(gameState.mode);
    showPhase(gameState, "name-entry");
    handlePlayerNameEntry(gameState.mode, "Player 1");
  });
});

showPhase(gameState, "board-setup");

// Player One Name Entry and Board Setup
// document.querySelector(".player-name__form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   // grab values
//   const player1 = e.target.player1Name.value.trim();
//   const player2 = gameState.mode === "pvp" ? e.target.player2Name.value.trim() : "AI";
//   console.log("Players:", player1, player2);

//   showPhase(gameState, "board-setup");
// });
// // just get the coordinates and dynamically input on the placeship
