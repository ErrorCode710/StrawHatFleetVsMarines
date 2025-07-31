const { GameBoard } = require("./gameboard.js");
const { Ship, shipsConfig } = require("./ship.js");

describe("Ship class", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("Carrier", 5);
  });

  test("should have correct type", () => {
    expect(ship.type).toBe("Carrier");
  });

  test("should have correct size", () => {
    expect(ship.size).toBe(5);
  });

  test("should incerease the ship hit", () => {
    ship.hit(0);
    expect(ship.hitCount()).toBe(1);
  });
  test("should sunked the ship", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    ship.hit(4);
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard Class", () => {
  let gameBoard;

  let ship;

  beforeEach(() => {
    ship = new Ship("Carrier", 5);
  });
  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("should the size of the gameboard is 10x10", () => {
    const expected = gameBoard.board.length;
    expect(expected).toBe(10);
  });

  test("should the size of Carrier ship is 5 ", () => {
    // place the carrier on start on 2,2 should end on 6,2
    // gameBoard.board[2][2];

    const size = shipsConfig.find((shipConfig) => shipConfig.name === "Carrier").size;

    expect(size).toBe(5);
  });

  test("Places the Carrier vertically starting at (2,2)  ", () => {
    const startCoord = [2, 2];
    const axis = "Y";
    const name = "Carrier";
    // place the carrier on start on 2,2 should end on 6,2
    // gameBoard.board[2][2];
    gameBoard.placeShip(name, axis, startCoord);

    const expectedCoords = [
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
    ];

    expectedCoords.forEach(([y, x]) => {
      const cell = gameBoard.board[y][x];

      expect(cell).toBeDefined();
      expect(cell.ship.type).toBe("Carrier");
    });
  });
  test("Places the Carrier horizontally starting at (2,2)  ", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";
    // place the carrier on start on 2,2 should end on 6,2
    // gameBoard.board[2][2];
    gameBoard.placeShip(name, axis, startCoord);

    const expectedCoords = [
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
    ];

    expectedCoords.forEach(([y, x]) => {
      const cell = gameBoard.board[y][x];

      expect(cell).toBeDefined();
      expect(cell.ship.type).toBe("Carrier");
    });
  });
  test("Should return true if there is already a ship on that coordinates  ", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";

    gameBoard.placeShip(name, axis, startCoord);

    const expectedCoords = [
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
    ];

    expectedCoords.forEach(([y, x]) => {
      gameBoard.board[y][x];
    });

    const isShipExist = gameBoard.isShipAlreadyExist("Y", 5, [2, 5]);
    expect(isShipExist).toBe(true);
  });

  test("return 1 when ship hit once", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";

    gameBoard.placeShip(name, axis, startCoord);
    gameBoard.receiveAttack(startCoord);
    const cell = gameBoard.board[2][6].ship.hits;
    const count = cell.filter((value) => value === true).length;
    expect(count).toBe(1);
  });
  test("return true when ship is sunked hit five times", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";

    gameBoard.placeShip(name, axis, startCoord);
    gameBoard.receiveAttack([2, 2]);
    gameBoard.receiveAttack([2, 3]);
    gameBoard.receiveAttack([2, 4]);
    gameBoard.receiveAttack([2, 5]);
    gameBoard.receiveAttack([2, 6]);
    expect(gameBoard.board[2][6].ship.isSunk()).toBe(true);
  });
  //records the coordinates of the missed shot.

  test("returns the coordinates of the missed shot", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";

    gameBoard.placeShip(name, axis, startCoord);
    const missedCoord = [0, 0];
    gameBoard.receiveAttack(missedCoord);

    expect(gameBoard.missedShot.has("0,0")).toBe(true);
  });

  test("returns the total missed shot", () => {
    const startCoord = [2, 2];
    const axis = "X";
    const name = "Carrier";

    gameBoard.placeShip(name, axis, startCoord);

    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([1, 2]);
    gameBoard.receiveAttack([1, 1]);

    expect(gameBoard.totalMiss()).toBe(3);
  });
  test("returns 3 as the total ship on the gameboard", () => {
    // to check is iterate the array and check for unique types of ship

    gameBoard.placeShip("Carrier", "X", [2, 2]);
    gameBoard.placeShip("Battleship", "X", [3, 2]);
    gameBoard.placeShip("Cruiser", "X", [4, 2]);

    expect(gameBoard.placedShip.length).toBe(3);
  });

  test("returns 2 as the total ship if one ship is sunk", () => {
    // to check is iterate the array and check for unique types of ship

    gameBoard.placeShip("Carrier", "X", [2, 2]);
    gameBoard.placeShip("Battleship", "X", [3, 2]);
    gameBoard.placeShip("Cruiser", "X", [4, 2]);

    gameBoard.receiveAttack([4, 2]);
    gameBoard.receiveAttack([4, 3]);
    gameBoard.receiveAttack([4, 4]);

    expect(gameBoard.totalRemainingShips()).toBe(2);
  });
});
