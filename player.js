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
    const adjacentTiles = this.getAdjacentTiles(y, x);
    console.log(adjacentTiles);
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
  getAdjacentTiles(y, x) {
    // console.log("running");
    // console.log(y, x);
    const tile = [];
    const direction = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [dy, dx] of direction) {
      const newY = y + dy;
      const newX = x + dx;

      if (newY >= 0 && newY < 10 && newX >= 0 && newX < 10) {
        tile.push([newY, newX]);
      }
    }
    return tile;
  }
}
