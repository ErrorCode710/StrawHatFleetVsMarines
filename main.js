import { Player } from "./player.js";
import { renderBoard } from "./dom.js";
import { GameManager } from "./gameManager.js";
// const player1 = new Player();
// const player2 = new Player();

// // player1.gameBoard.placeShip("Carrier", "X", [2, 2]);
// player1.gameBoard.placeShipRandomly();
// player2.gameBoard.placeShipRandomly();

// renderBoard(player1.gameBoard, "player1");
// renderBoard(player2.gameBoard, "player2");

// console.log("running");
// console.log(player1);

// console.log(player1.gameBoard.board);
const gameManager = new GameManager();
gameManager.startGame();

const player1Board = document.querySelector("#player2"); // player1 attacks player2's board
const player2Board = document.querySelector("#player1"); // player2 attacks player1's board

[player1Board, player2Board].forEach((board) => {
  board.addEventListener("click", (e) => {
    if (!e.target.classList.contains("gameBoard__cell")) return;

    const coord = e.target.dataset.coord;
    const [y, x] = coord.split(",").map(Number);

    const isPlayer1Turn = gameManager.currentPlayer === gameManager.player1;
    const isCorrectBoard = (isPlayer1Turn && board === player1Board) || (!isPlayer1Turn && board === player2Board);

    if (!isCorrectBoard) return; // ❌ wrong board for current player

    gameManager.gameLoop(y, x);
  });
});
/* TODO

my concern is what if i click my board instead of my opponent i know the coordinates will just transpose and hit on there board


*/
