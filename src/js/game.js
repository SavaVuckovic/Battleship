import Player from './player';
import Gameboard from './gameboard';
import { 
  initializeBoards,
  addSlotListeners,
  hitSlot,
  sinkShip,
  deactivateSlot,
  showGameOver
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

  if (humanMoveResult === 'hit') {
    hitSlot('computer', humanMove);
  } else if (humanMoveResult === 'miss') {
    deactivateSlot('computer', humanMove);
    // computers turn to play
    // ...
  } else if (humanMoveResult === 'game over') {
    showGameOver('Congratulations, you have won the game!', () => startGame(human.name));
  } else {
    // ship is sunk, its positions are returned inside humanMoveResult
    sinkShip('computer', humanMoveResult);
  }
}