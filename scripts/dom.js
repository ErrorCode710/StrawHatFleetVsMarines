// for update
import { Ship } from "./ship.js";

let playerNames = {
  player1: "",
  player2: "",
};

export function renderBoard(gameBoard, playerBoard) {
  const boardContainer = document.getElementById(playerBoard);
  // console.log(boardContainer);
  boardContainer.innerHTML = ""; // Clear previous board

  for (let y = 0; y < gameBoard.board.length; y++) {
    for (let x = 0; x < gameBoard.board[y].length; x++) {
      const value = gameBoard.board[y][x];
      let classValue = "empty";

      if (value === 0) {
        classValue = "empty";
      } else if (value.state === "idle") {
        classValue = "ship";
      } else if (value.state === "hit") {
        classValue = "hit";
      } else if (value === "miss") {
        classValue = "miss";
      }

      const tile = cell(y, x, classValue);

      boardContainer.appendChild(tile);
    }
  }
}

export function renderPlayerNameInput(player) {
  console.log("running");
  const playerNameScreen = document.querySelector("#player-name-screen");
  const playerNameInput = document.querySelector(".player-name__input");

  playerNameInput.placeholder = `${player} Fleet Name`;
  const homeScreen = document.querySelector("#home-screen");
  const gameScreen = document.querySelector("#game-screen");

  playerNameScreen.classList.remove("hidden");
  homeScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  playerNameForm(player);
}
function renderPlayerNameScreen(player) {
  const playerNameInput = document.querySelector(".player-name__input");
  playerNameInput.placeholder = `${player} Fleet Name`;

  document.querySelector("#player-name-screen").classList.remove("hidden");
  document.querySelector("#home-screen").classList.add("hidden");
  document.querySelector("#game-screen").classList.add("hidden");
}
export function handlePlayerNameEntry(gameMode, player) {
  // renderPlayerNameScreen(player);
  playerNameForm(gameMode, player);
}

function playerNameForm(gameMode, player) {
  const form = document.querySelector(".player-name__form");
  const btn = document.querySelector(".player-name__button");
  const playerNameInput = document.querySelector("#player-name-input");

  form.onsubmit = (event) => {
    event.preventDefault();
    const name = playerNameInput.value.trim();
    if (name) {
      console.log(`${player} Name:`, name);
      console.log(gameMode);
      if (gameMode === "pvp") {
        if (player === "Player 1") {
          playerNames.player1 = name;
          btn.textContent = "Start Game";
          playerNameInput.value = "";

          renderPlayerNameInput("Player 2");
        } else {
          playerNames.player2 = name;
          console.log("Both players named, start game!");
          // startGame();
        }
      } else {
        playerNames.player1 = name;
        playerNames.player2 = "AI";
      }
    }
  };
}

function startGame() {
  const playerNameScreen = document.querySelector("#player-name-screen");
  const gameScreen = document.querySelector("#game-screen");

  playerNameScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  renderPlayersName();
}
function renderPlayersName() {
  const player1 = document.querySelector(".game-screen__player--1");
  const player2 = document.querySelector(".game-screen__player--2");

  player1.textContent = playerNames.player1;
  player2.textContent = playerNames.player2;
}

function cell(y, x, value) {
  const element = document.createElement("div");
  const dataset = (element.dataset.coord = `${y},${x}`);
  element.classList.add("gameBoard__cell", value);

  return element;
}

export function showPhase(state, phase) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.style.display = el.dataset.phase === phase ? "flex" : "none";
  });
  state.phase = phase;
}

export function buildSetUpBoard() {
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
export function setUpBoard() {
  const board = { board: buildSetUpBoard() };
  renderBoard(board, "player1-board");
}

let orientation = "Y";

let placeholder = null;
let draggingShip = null;
let shipPlace = [];

const ships = document.querySelectorAll(".board-setup__ship-card");

ships.forEach((ship) => {
  ship.addEventListener("mousedown", (e) => {
    draggingShip = {
      type: ship.dataset.shipType,
      length: parseInt(ship.dataset.shipLength),
      imgSrc: ship.querySelector("img").src,
    };
  });
});
const board = document.querySelector("#player1-board");

board.addEventListener("dragover", (e) => {
  if (!draggingShip) return;

  const cell = e.target.closest(".gameBoard__cell");
  if (!cell) return;

  document.querySelectorAll(".highlight, .danger").forEach((c) => c.classList.remove("highlight", "danger"));

  const [row, col] = cell.dataset.coord.split(",").map(Number);
  const y = row;
  const x = col;
  const length = draggingShip.length;

  const fitsOnBoard = orientation === "X" ? x + length - 1 < 10 : y + length - 1 < 10;

  let canPlace = true;
  for (let i = 0; i < length; i++) {
    const targetX = orientation === "X" ? x + i : x;
    const targetY = orientation === "Y" ? y + i : y;
    const targetCell = board.querySelector(`[data-coord="${targetY},${targetX}"]`);
    if (!targetCell || targetCell.classList.contains("occupied")) {
      canPlace = false;
    }
  }

  for (let i = 0; i < length; i++) {
    const targetX = orientation === "X" ? x + i : x;
    const targetY = orientation === "Y" ? y + i : y;
    const targetCell = board.querySelector(`[data-coord="${targetY},${targetX}"]`);
    if (targetCell) {
      // targetCell.classList.add(fitsOnBoard && canPlace ? "highlight" : "danger");
      if (fitsOnBoard && canPlace) {
        e.preventDefault();
        targetCell.classList.add("highlight");
      } else {
        targetCell.classList.add("danger");
        // return;
      }
    }
  }
});

board.addEventListener("drop", (e) => {
  e.preventDefault();
  if (!draggingShip) return;

  const cell = e.target.closest(".gameBoard__cell");
  if (!cell) return;

  // getting the coordinates
  const [row, col] = cell.dataset.coord.split(",").map(Number);
  const y = row;
  const x = col;
  const length = draggingShip.length;

  // check if fits on the board
  const fitsOnBoard = orientation === "X" ? x + length - 1 < 10 : y + length - 1 < 10;

  if (!fitsOnBoard) {
    document.querySelectorAll(".danger").forEach((c) => c.classList.remove("danger"));
    draggingShip = null;
    return;
  }

  for (let i = 0; i < length; i++) {
    const targetX = orientation === "X" ? x + i : x;
    const targetY = orientation === "Y" ? y + i : y;
    const targetCell = board.querySelector(`[data-coord="${targetY},${targetX}"]`);
    if (targetCell) targetCell.classList.add("occupied");
  }

  shipPlace.push({
    shipType: draggingShip.type,
    coords: [row, col],
    axis: orientation,
  });

  console.log(shipPlace);

  document.querySelectorAll(".highlight, .danger").forEach((c) => c.classList.remove("highlight", "danger"));

  // placeholder
  const ship = document.querySelector(`[data-ship-type="${draggingShip.type}"]`);

  placeholder = document.createElement("div");
  placeholder.classList.add("board-setup__ship-placeholder");
  ship.parentNode.insertBefore(placeholder, ship);

  const imgSrc = ship.querySelector(".board-setup__ship-img").src;
  console.log(imgSrc);
  ship.remove();

  // placeShipOnBoard(x, y, ship);
  // placeShipAbsolute(x, y, length, orientation, imgSrc);

  draggingShip = null; // reset after drop
});

document.querySelectorAll(".axis-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetBtn = e.target;

    if (targetBtn.dataset.axis === "X") {
      orientation = "X";
      console.log(orientation);
    } else {
      orientation = "Y";
    }
    console.log(targetBtn.dataset);
  });
});
