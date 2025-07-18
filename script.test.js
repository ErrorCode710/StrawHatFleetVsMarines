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
  // Gameboard size should be 10x10
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

  test("should place the ship on specific coordinates ", () => {
    // place the carrier on start on 2,2 should end on 6,2
    // gameBoard.board[2][2];

    const place = gameBoard.placeShip("Carrier", "y", [2, 2]);

    const cell = gameBoard.board[2][2];

    expect(cell).toBe(1);
  });
});
