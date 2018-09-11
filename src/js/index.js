import '../scss/index.scss';
import '../index.html';
import Gameboard from './gameboard';
import Player from './player';
import { createBoards, selectPlayerName } from './ui';

// when document loads
document.addEventListener("DOMContentLoaded", () => {
  selectPlayerName() // only after player inputs a valid name
    .then(playerName => {
      // initialize game objects
      const human = new Player(playerName);
      const computer = new Player('Computer', false);
      const humanBoard = new Gameboard();
      const computerBoard = new Gameboard();

      // create boards in the UI
      createBoards(human, humanBoard, computer, computerBoard);
    });
});