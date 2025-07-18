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
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }
  placeShip(shipName, axis, [startY, startX]) {
    const size = shipsConfig.find((shipConfig) => shipConfig.name === shipName).size;
    const ship = new Ship(shipName, size);

    /*First approach to check if the coordinates is empty is 
        is to create an array of coordinates and then loop through them if result is false then loop again to put the ship on the coordinates
    */

    if (axis === "Y") {
      for (let i = 0; i < size; i++) {
        this.board[startY + i][startX] = ship;
      }
    } else {
      for (let i = 0; i < size; i++) {
        this.board[startY][startX + i] = ship;
      }
    }
  }
  isShipAlreadyExist(axis, size, [startY, startX]) {
    for (let i = 0; i < size; i++) {
      const x = axis === "X" ? startX + i : startX;
      const y = axis === "Y" ? startY + i : startY;

      if (this.board[y]?.[x] !== 0) return true;
    }
    return false;
  }

  print(arr) {
    arr.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

const ship = new Ship("carrier", 5);
const board = new GameBoard();
board.placeShip("Carrier", "X", [2, 2]);
board.board[2][2];
board.print(board.board);
console.log(board.board[6][2].type);
console.log(board.board);

module.exports = { Ship, GameBoard, shipsConfig };
