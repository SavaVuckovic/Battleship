import '../scss/index.scss';
import '../index.html';
import Gameboard from './gameboard';
import Player from './player';
import { createBoards, selectPlayerName } from './ui';

selectPlayerName()
  .then(playerName => {
    const human = new Player(playerName);
    const computer = new Player('Computer', false);
    const humanBoard = new Gameboard();
    const computerBoard = new Gameboard();

    createBoards(human, humanBoard, computer, computerBoard);
  })
  .catch(err => alert(err));