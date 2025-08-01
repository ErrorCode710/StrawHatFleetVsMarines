import { GameBoard } from "./gameboard.js";

export class Player {
  constructor(playerName) {
    this.gameBoard = new GameBoard();
    this.playerName = playerName;
  }
  realPlayer() {}
  computerPlayer() {}
}
