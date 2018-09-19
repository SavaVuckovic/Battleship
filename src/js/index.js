import '../scss/index.scss';
import '../index.html';
import { selectPlayerName } from './ui';
import startGame from './game';

// when document loads
document.addEventListener("DOMContentLoaded", () => {
  // start the game only after player inputs a valid name
  selectPlayerName().then(playerName => startGame(playerName));
});