import { Player } from "./player.js";
import { renderBoard } from "./dom.js";
import { GameManager } from "./gameManager.js";

const gameManager = new GameManager();
gameManager.startGame();

const player1Board = document.querySelector("#player2"); // player1 attacks player2's board
const player2Board = document.querySelector("#player1"); // player2 attacks player1's board

[player1Board, player2Board].forEach((board) => {
  board.addEventListener("click", (e) => {
    if (!e.target.classList.contains("gameBoard__cell")) return;
    if (e.target.classList.contains("hit") || e.target.classList.contains("miss")) return;

    const coord = e.target.dataset.coord;
    const [y, x] = coord.split(",").map(Number);

    const isPlayer1Turn = gameManager.currentPlayer === gameManager.player1;
    const isCorrectBoard = (isPlayer1Turn && board === player1Board) || (!isPlayer1Turn && board === player2Board);

    if (!isCorrectBoard) return;

    gameManager.gameLoop(y, x);
  });
});

/*

The error occurs when I hit the same coords with 

*/
