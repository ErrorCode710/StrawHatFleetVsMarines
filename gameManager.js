// gameManager will handle new game setup
// player vs player and player vs ai
// taking turns
// and who will win
import { Player } from "./player.js";
import { GameBoard } from "./gameboard.js";
import { renderBoard } from "./dom.js";

export class GameManager {
  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.currentPlayer = this.player1;
  }
  startGame() {
    this.player1.gameBoard.placeShipRandomly();
    this.player2.gameBoard.placeShipRandomly();
    this.render();
    // this.gameLoop();
  }
  gameLoop(y, x) {
    console.log(y, x);
    this.opponent().gameBoard.receiveAttack([y, x]);
    this.render();

    if (this.checkVictory()) {
      console.log(this.currentPlayer === this.player1 ? "player 1 wins" : "player 2 wins");
      return;
    }

    this.switchTurns();
    // get the  attack coordinates
    // check the opponent board if all sunked does mean current player is win
    // if not switch turn
  }
  switchTurns() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
  checkVictory() {
    return this.opponent().gameBoard.totalRemainingShips() === 0 ? true : false;
  }
  opponent() {
    return this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
  render() {
    // we can refractor this like only render after attack
    renderBoard(this.player1.gameBoard, "player1");
    renderBoard(this.player2.gameBoard, "player2");
  }
  getAttackCoordinates() {}
}
