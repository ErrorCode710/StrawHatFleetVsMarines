const shipsConfig = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    // this.life = size; // redudant
    this.hits = 0;
  }
  hit() {
    return this.hits++;
  }
  isSunk() {
    return this.hits >= this.size;
  }
  info() {
    return `Class of Ship ${this.type} size of the ship ${this.size} hitpoint of the ship ${this.life} hits of the ship ${
      this.hits
    } is Ship Sunked: ${this.isSunk()}`;
  }
}
class GameBoard {
  constructor() {
    this.board = this.buildGameBoard();
    // this.print(this.board);
  }

  buildGameBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(`[${0}]`);
      }
      board.push(row);
    }
    return board;
  }
  placeShip(shipName, axis, [startY, startX]) {
    const size = shipsConfig.find((shipConfig) => shipConfig.name === shipName).size;
    const ship = new Ship(shipName, size);
    const start = (this.board[startY][startX] = 1); // we need to convert this into "1"

    return start;
  }
  print(arr) {
    arr.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

// const ship = new Ship("carrier", 5);
const board = new GameBoard();

module.exports = { Ship, GameBoard, shipsConfig };
