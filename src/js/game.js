import Player from './player';
import Gameboard from './gameboard';
import { 
  initializeBoards,
  addSlotListeners,
  deactivateSlot
 } from './ui';

export default function startGame(playerName) {
  // initialize game objects
  const human = new Player(playerName);
  const computer = new Player('Computer', false);
  const humanBoard = new Gameboard();
  const computerBoard = new Gameboard();

  // generate board slots & ships
  humanBoard.setup();
  computerBoard.setup();

  // initialize boards in the UI
  initializeBoards(human, humanBoard, computer, computerBoard);
  addSlotListeners(playTurn);
}

function playTurn(humanMove) {
  deactivateSlot('computer', humanMove);
  console.log('clicked');
}