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
export function createBoards(human, humanGameboard, computer, computerGameboard) {
  const boardsContainer = document.querySelector('.boards');
  const humanBoard = generateBoard(human, Object.keys(humanGameboard.slots));
  const separator = generateBoardSeparator();
  const computerBoard = generateBoard(computer, Object.keys(computerGameboard.slots));

  boardsContainer.appendChild(humanBoard);
  boardsContainer.appendChild(separator);
  boardsContainer.appendChild(computerBoard);
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
  if (player.human) {
    populateBoardWithSlots(newBoard.querySelector('.board'), slots);
  } else {
    populateBoardWithSlots(newBoard.querySelector('.board'), slots, false);
  }

  return newBoard;
}

// populates a board with slot divs
function populateBoardWithSlots(board, slots, human = true) {
  slots.forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    if (!human) {
      slotDiv.classList.add('enemy');
      slotDiv.addEventListener('click', e => console.log(slot)); // change later
    }
    slotDiv.dataset.coordinates = slot;
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