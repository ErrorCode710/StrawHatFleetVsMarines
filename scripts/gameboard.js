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

    if (this.isShipAlreadyExist(axis, size, [startY, startX])) {
      console.warn("Ship Already Exist");
      return false;
    }
    if (axis === "Y") {
      for (let i = 0; i < size; i++) {
        this.board[startY + i][startX] = { ship: ship, index: i, state: "idle" };
      }
    } else {
      for (let i = 0; i < size; i++) {
        this.board[startY][startX + i] = { ship: ship, index: i, state: "idle" };
      }
    }
    this.placedShip.push(ship);
    return true;
  }
  placeShipRandomly() {
    for (const ship of shipsConfig) {
      let placed = false;

      while (!placed) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        const randomAxis = Math.random() >= 0.5 ? "X" : "Y";

        placed = this.placeShip(ship.name, randomAxis, [randomY, randomX]);
      }
    }

    // we need to place all of the ship on the shipconfig
    // for every ships on the ship config
  }
  placeShipSpecific(){
    
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
    console.log(`"The receive attack ${y}, ${x}`)
    const cell = this.board[y]?.[x];
    console.log(cell);
    // if (cell.state === "hit") {
    //   console.log("already hit");
    //   return;
    // }
    if (cell === "miss") {
      console.log("ai hit the miss");
      return;
    }
    if (cell !== 0 && "miss") {
      console.log(cell.ship.hit(cell.index));
      cell.ship.hit(cell.index);
      this.removeShipIfSunk(cell.ship);
      this.board[y][x].state = "hit";
      const total = this.totalRemainingShips();
      console.log(`Total Ship on the board ${total}`);
      return { hit: true, coord: [y, x], sunk: this.removeShipIfSunk(cell.ship), shipSize: cell.ship.size };
    } else {
      this.board[y][x] = "miss";
      this.missedShot.add(`${y},${x}`);
      // console.log(this.missedShot);
      return false;
    }
  }

  totalRemainingShips() {
    return this.placedShip.length;
  }

  removeShipIfSunk(ship) {
    if (ship.isSunk()) {
      // console.log(ship.type);
      const index = this.placedShip.findIndex((shipIndex) => shipIndex.type === ship.type);

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
