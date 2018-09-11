import '../scss/index.scss';
import '../index.html';
import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './players';
import { createBoards, selectPlayerName } from './ui';

selectPlayerName().then(playerName => {
  const human = new Player(playerName);
  const computer = new ComputerPlayer('computer');
  const humanBoard = new Gameboard();
  const computerBoard = new Gameboard();

  createBoards(human, humanBoard, computer, computerBoard);
});