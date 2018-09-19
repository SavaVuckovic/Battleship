import { nameIsValid } from './helpers';

// opens a modal allowing player to select his name
export function selectPlayerName() {
  const modal = document.querySelector('#player-name-modal');
  const form = document.querySelector('#player-name-form'); 
  // show the player name modal
  toggleModal(modal);
  
  return new Promise(resolve => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // extract player name value
      const playerName = e.target.elements['player-name'].value;
      // validate the name
      const msg = nameIsValid(playerName);
      if (msg === 'Valid') {
        resolve(playerName);
        toggleModal(modal);
      } else {
        alert(msg);
      }
    });
  });
};

// creates boards in the UI
export function initializeBoards(human, humanGameboard, computer, computerGameboard) {
  const boardsContainer = document.querySelector('.boards');
  const humanBoard = generateBoard(human, humanGameboard.slots);
  const separator = generateBoardSeparator();
  const computerBoard = generateBoard(computer, computerGameboard.slots);

  boardsContainer.innerHTML = '';
  boardsContainer.appendChild(humanBoard);
  boardsContainer.appendChild(separator);
  boardsContainer.appendChild(computerBoard);
}

// add slot click listeners
export function addSlotListeners(callback) {
  const slots = document.querySelectorAll('#computer-board .slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => callback(slot.dataset.coordinates));
  });
}

// hit a slot in the UI
export function hitSlot(player, coordinates) {
  const slot = findSlot(player, coordinates);
  if (slot.classList.contains('enemy')) {
    slot.classList.remove('enemy');
  }
  slot.classList.add('hit');
}

// sink a ship in the UI
export function sinkShip(player, positions) {
  const slots = positions.map(coord => findSlot(player, coord));
  slots.forEach(slot => {
    if (slot.classList.contains('enemy')) {
      slot.classList.remove('enemy');
    }
    slot.classList.add('destroyed');
  });
}

// deactivate a slot in the UI by replacing it with unactve slot
export function deactivateSlot(player, coordinates) {
  const board = document.querySelector(`#${player}-board`);
  const slot = board.querySelector(`[data-coordinates='${coordinates}']`);
  const unactive = document.createElement('div');
  unactive.classList.add('unactive-slot');
  board.replaceChild(unactive, slot);
}

// displays a game over modal with a proper message
export function showGameOver(msg, callback) {
  const modal = document.querySelector('#game-over-modal');
  const message = modal.querySelector('.message');
  const playAgainBtn = document.querySelector('#play-again');
  const refreshBtn = document.querySelector('#refresh');

  modal.style.display = 'block';
  message.innerHTML = msg;

  playAgainBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    callback();
  });

  refreshBtn.addEventListener('click', () => {
    document.location.reload();
  });
};

// displays a message in the UI when a ship is sunk
export function showMessage(msg) {
  const message = document.querySelector('.msg');
  message.innerText = msg;
  message.style.visibility = 'visible';
  setTimeout(() => {
    message.style.visibility = 'hidden';
  }, 2000);
}

// given a board player and coordinates, find a ship
function findSlot(player, coordinates) {
  const board = document.querySelector(`#${player}-board`);
  const slot = board.querySelector(`[data-coordinates='${coordinates}']`);
  return slot;
}

// show/hide modal
function toggleModal(modal) {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

// generates a single board
function generateBoard(player, slots) {
  // clone the board template
  const boardTemplate = document.querySelector('#board-template .board-wrapper');
  const newBoard = boardTemplate.cloneNode(true);
  // fill it with proper information
  newBoard.querySelector('.player').innerText = player.name;
  // generate board slots
  const board = newBoard.querySelector('.board');
  if (player.human) {
    board.id = 'human-board';
    populateBoardWithSlots(board, slots);
  } else {
    board.id = 'computer-board';
    populateBoardWithSlots(board, slots, false);
  }

  return newBoard;
}

// populates a board with slot divs
function populateBoardWithSlots(board, slots, human = true) {
  Object.keys(slots).forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    if (!human) {
      slotDiv.classList.add('enemy');
    } 
    // else if (slots[slot] !== 'empty') {
    //   slotDiv.classList.add('ship');
    // }
    if (slots[slot] !== 'empty') {
      slotDiv.classList.add('ship');
    }
    slotDiv.dataset.coordinates = slot;
    // debug
    slotDiv.innerText = slot;
    board.appendChild(slotDiv);
  });
}

// creates a space between boards in the UI
function generateBoardSeparator() {
  const separator = document.createElement('div');
  separator.classList.add('board-separator');
  const vs = document.createElement('span');
  vs.innerText = 'vs';
  separator.appendChild(vs);

  return separator;
}