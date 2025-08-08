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
    this.missedShot = new Set();
    this.placedShip = [];
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

    if (this.isShipAlreadyExist(axis, size, [startY, startY])) {
      console.warn("Ship Already Exist");
      return false;
    }
    if (axis === "Y") {
      for (let i = 0; i < size; i++) {
        this.board[startY + i][startX] = ship;
      }
    } else {
      for (let i = 0; i < size; i++) {
        this.board[startY][startX + i] = ship;
      }
    }
    this.placedShip.push(ship);
  }

  isShipAlreadyExist(axis, size, [startY, startX]) {
    for (let i = 0; i < size; i++) {
      const x = axis === "X" ? startX + i : startX;
      const y = axis === "Y" ? startY + i : startY;

      if (this.board[y]?.[x] !== 0) return true;
    }
    return false;
  }

  receiveAttack([y, x]) {
    const ship = this.board[y][x];
    if (ship !== 0) {
      ship.hit();
      this.removeShipIfSunk(ship);
    } else {
      this.missedShot.add(`${y},${x}`);
    }
    this.totalRemainingShips();
  }

  totalRemainingShips() {
    return this.placedShip.length;
  }

  removeShipIfSunk(ship) {
    if (ship.isSunk()) {
      // console.log(ship.type);
      const index = this.placedShip.findIndex((ship) => ship.type === ship.type);

      // console.log(index);
      if (index !== -1) {
        this.placedShip.splice(index, 1);
      }
      return true;
    } else {
      return false;
    }
  }

  totalMiss() {
    return this.missedShot.size;
  }
  print(arr) {
    arr.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

// const ship = new Ship("carrier", 5);
// const board = new GameBoard();
// // board.placeShip("Carrier", "X", [2, 2]);
// board.placeShip("Cruiser", "X", [4, 2]);
// board.receiveAttack([4, 2]);
// board.receiveAttack([4, 3]);
// board.receiveAttack([4, 4]);

// board.board[2][2];
// board.print(board.board);
// console.log(board.board);

// module.exports = { Ship, GameBoard, shipsConfig };
