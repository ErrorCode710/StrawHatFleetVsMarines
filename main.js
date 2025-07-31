
import { Player } from "./player.js";
import { renderBoard } from "./dom.js";

const player1 = new Player();
const player2 = new Player();

player1.gameBoard.placeShip("Carrier", "X", [2, 2]);

player1.gameBoard.receiveAttack([2, 2]);
player1.gameBoard.receiveAttack([2, 4]);

renderBoard(player1.gameBoard, "player1");
renderBoard(player2.gameBoard, "player2");

console.log("running");

console.log(player1.gameBoard.board[2][3].isSunk());

/* TODO
Placing of ship should have one unique ship at a time

analysis complete because the object is replace with just a string of hit 



*/