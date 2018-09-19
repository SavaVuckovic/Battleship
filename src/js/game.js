import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './player';
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
  computer = new ComputerPlayer();
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
    computerTurn();
  } else if (humanMoveResult === 'game over') {
    showGameOver('Victory, you have destroyed all of enemy ships!', () => startGame(human.name));
  } else {
    // ship is sunk, its positions are returned inside humanMoveResult
    sinkShip('computer', humanMoveResult);
  }
}

function computerTurn() {
  setTimeout(() => {
    const computerMove = computer.attack()
    const computerMoveResult = humanBoard.receiveAttack(computerMove);

    if (computerMoveResult === 'hit') {
      hitSlot('human', computerMove);
      computer.smartGuessMode(computerMove);
      computerTurn();
    } else if (computerMoveResult === 'miss') {
      deactivateSlot('human', computerMove);
    } else if (computerMoveResult === 'game over') {
      showGameOver('Defeat, enemy has destroyed all of your ships!', () => startGame(human.name));
    } else {
      sinkShip('human', computerMoveResult);
      computer.stopSmartGuessing();
    }
  }, 300);
}