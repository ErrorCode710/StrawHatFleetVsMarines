import { GameBoard } from "./gameboard.js";

export class Player {
  constructor(playerName, isPlayerAi) {
    this.gameBoard = new GameBoard();
    this.playerName = playerName;
    this.isPlayerAi = isPlayerAi;
    this.attackCoord = new Set();
    this.queue = [];
  }
  realPlayer() {}
  AiPlayer() {
    if (!this.isPlayerAi) return;

    // return [y, x];
    // const coord = this.getRandomMoves();

    // this.attackCoord.add(coord);
    // const [y, x] = coord.split(",").map(Number);
    // const adjacentTiles = this.getAdjacentTiles(y, x);
    // console.log(adjacentTiles);
    // return [y, x];
    console.log("Queue length:", this.queue.length, "=>", this.queue);

    if (this.queue.length <= 0) {
      const coord = this.getRandomMoves();
      this.attackCoord.add(coord);
      const [y, x] = coord.split(",").map(Number);
      return [y, x];
    } else {
      console.log("Start the adjacent killer");

      const coord = this.queue.shift();
      console.log(coord);
      this.attackCoord.add(coord.join(","));
      console.log(this.attackCoord);
      const [y, x] = coord;
      console.log(y, x);
      return [y, x];
    }

    // if queue is empty proceed to find moves if not then
  }
  processResult(result) {
    if (!this.isPlayerAi) return;

    if (result.sunk) {
      this.queue = [];
      console.log("Ship is sunk find another coordinates or return");
      return;
    }

    if (result.hit) {
      const tiles = this.getAdjacentTiles(result.coord[0], result.coord[1]);
      // tiles.forEach(("tile" => {this.queue.push(tiles)})

      tiles.forEach((tile) => {
        this.queue.push(tile);
      });
    }
  }
  getResult(result) {
    this.processResult(result);
    console.log(result);
  }
  getRandomMoves() {
    let coord;
    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      coord = `${y},${x}`;
    } while (this.attackCoord.has(coord));

    return coord;
  }
  isCoordsUnique(y, x) {
    const coords = `${y},${x}`;
    const queueSet = new Set(this.queue.map((value) => value.join(",")));

    if (this.attackCoord.has(coords) || queueSet.has(coords)) {
      return false;
    }
    return true;
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
        // tile.push([newY, newX]);

        if (this.isCoordsUnique(newY, newX)) {
          // tile.push(coords);
          tile.push([newY, newX]);
        }
      }
    }
    return tile;
  }
}
