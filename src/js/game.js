import Player from './player';
import Gameboard from './gameboard';
import { 
  initializeBoards,
  addSlotListeners,
  hitSlot,
  deactivateSlot
 } from './ui';

let human;
let computer;
let humanBoard;
let computerBoard;

export default function startGame(playerName) {
  // initialize game objects
  human = new Player(playerName);
  computer = new Player('Computer', false);
  humanBoard = new Gameboard();
  computerBoard = new Gameboard();

  // generate board slots & ships
  humanBoard.setup();
  computerBoard.setup();

  // initialize boards in the UI
  initializeBoards(human, humanBoard, computer, computerBoard);
  addSlotListeners(playTurn);
}

function playTurn(humanMove) {
  const humanMoveResult = computerBoard.receiveAttack(humanMove);
  switch (humanMoveResult) {
    case 'hit':
      // hit the ship in the UI
      hitSlot('computer', humanMove);
      break;
    case 'sunk':
      // if all ships are sunk, show game over
      // ...
      break;
    case 'miss':
      // deactivate the slot in the UI
      deactivateSlot('computer', humanMove);
      // computers turn to play
      // ...
  }
}