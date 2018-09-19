import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './player';
import { 
  initializeBoards,
  addSlotListeners,
  hitSlot,
  sinkShip,
  deactivateSlot,
  showGameOver,
  showMessage
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
  initializeBoards(human, humanBoard.slots, computer, computerBoard.slots);
  addSlotListeners(playTurn);
}

// plays a single turn in the game - human player click followed by computer turn
function playTurn(humanMove) {
  const humanMoveResult = computerBoard.receiveAttack(humanMove);

  switch (humanMoveResult) {
    case 'hit':
      hitSlot('computer', humanMove);
      break;
    case 'miss':
      deactivateSlot('computer', humanMove);
      // computers turn to play
      computerTurn();
      break;
    case 'sunk':
      if (playerWon('human')) {
        showGameOver('Victory, you have destroyed all of enemy ships!', () => startGame(human.name));
      }
      const sunkShipInfo = computerBoard.getLastSunkShip();
      showMessage(`You have destroyed an enemy ${sunkShipInfo.name}`);
      sinkShip('computer', sunkShipInfo.positions);
      break;
  }
}

// computers turn 
function computerTurn() {
  setTimeout(() => {
    const computerMove = computer.attack()
    const computerMoveResult = humanBoard.receiveAttack(computerMove);

    switch (computerMoveResult) {
      case 'hit':
        hitSlot('human', computerMove);
        computer.smartGuessMode(computerMove);
        // computer plays again as long as he keeps hitting
        computerTurn();
        break;
      case 'miss':
        deactivateSlot('human', computerMove);
        break;
      case 'sunk':
        computer.stopSmartGuessing();
        if (playerWon('computer')) {
          showGameOver('Defeat, enemy has destroyed all of your ships!', () => startGame(human.name));
        }
        const sunkShipInfo = humanBoard.getLastSunkShip();
        showMessage(`Enemy has destroyed your ${sunkShipInfo.name}`);
        sinkShip('human', sunkShipInfo.positions);
        break;
    }
  }, 300);
}

// check if player has won
function playerWon(player) {
  if (player === 'human') {
    return computerBoard.allShipsSunk();
  } else {
    return humanBoard.allShipsSunk();
  }
}