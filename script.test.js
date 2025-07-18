const { Ship, GameBoard, shipsConfig } = require("./script");

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
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  test("should sunked the ship", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
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
      expect(cell.type).toBe("Carrier");
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
      expect(cell.type).toBe("Carrier");
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
    expect(gameBoard.board[2][6].hits).toBe(1);
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
    expect(gameBoard.board[2][6].isSunk()).toBe(true);
  });
});
