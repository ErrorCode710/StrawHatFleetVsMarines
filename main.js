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

console.log(player1.gameBoard.board);

/* TODO
Placing of ship should have one unique ship at a time

Problem: How do i know if part of the ship is hit without replacing the object into string hit

Why? because i cant use .isSunk if i replace the object into string

analysis complete: Just put a properth named state and put a value of hit instead of changing the object into string "hit" 

I forgot that if i put a property on that specific board coordinates it affects the other because it point the same object



*/
