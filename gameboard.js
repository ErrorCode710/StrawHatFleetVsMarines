import { Ship, shipsConfig } from "./ship.js";

export class GameBoard {
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
      this.board[y][x].state = "hit";
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

// module.exports = GameBoard;
