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
