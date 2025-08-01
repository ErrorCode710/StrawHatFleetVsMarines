import { GameBoard } from "./gameboard.js";

export class Player {
  constructor(playerName, isPlayerAi) {
    this.gameBoard = new GameBoard();
    this.playerName = playerName;
    this.isPlayerAi = isPlayerAi;
    this.attackCoord = new Set();
  }
  realPlayer() {}
  AiPlayer() {
    if (!this.isPlayerAi) return;

    // return [y, x];
    const coord = this.getRandomMoves();

    this.attackCoord.add(coord);
    const [y, x] = coord.split(",").map(Number);
    return [y, x];
  }
  getResult(result) {
    console.log(result);
  }
  getRandomMoves() {
    let coord;
    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      coord = `${y}, ${x}`;
    } while (this.attackCoord.has(coord));

    return coord;
  }
}
