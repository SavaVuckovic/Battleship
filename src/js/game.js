import Player from './player';
import Gameboard from './gameboard';
import { 
  initializeBoards,
  addSlotListeners
 } from './ui';

export default function startGame(playerName) {
  // initialize game objects
  const human = new Player(playerName);
  const computer = new Player('Computer', false);
  const humanBoard = new Gameboard();
  const computerBoard = new Gameboard();

  // initialize boards in the UI
  initializeBoards(human, humanBoard, computer, computerBoard);
  addSlotListeners(playTurn);
}

function playTurn(humanPlayerMove) {
  console.log(humanPlayerMove);
}