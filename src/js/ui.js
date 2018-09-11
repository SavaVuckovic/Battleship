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
      // hide the modal
      toggleModal(modal);

      resolve(playerName);
    });
  });
};

function toggleModal(modal) {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

export function createBoards(human, humanGameboard, computer, computerGameboard) {
  const boardsContainer = document.querySelector('.boards');

  const humanBoard = generateBoard(human, Object.keys(humanGameboard.slots));
  const separator = generateBoardSeparator();
  const computerBoard = generateBoard(computer, Object.keys(computerGameboard.slots));

  boardsContainer.appendChild(humanBoard);
  boardsContainer.appendChild(separator);
  boardsContainer.appendChild(computerBoard);
}

function generateBoard(player, slots) {
  // clone the board template
  const boardTemplate = document.querySelector('#board-template .board-wrapper');
  const newBoard = boardTemplate.cloneNode(true);
  // fill it with proper information
  newBoard.querySelector('.player').innerText = player.name;
  // generate slots
  populateBoardWithSlots(newBoard.querySelector('.board'), slots);
  // add event listeners to enemy (computer) board
  // ...

  return newBoard;
}

function populateBoardWithSlots(board, slots) {
  slots.forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    slotDiv.dataset.coordinates = slot;
    board.appendChild(slotDiv);
  });
}

function generateBoardSeparator() {
  const separator = document.createElement('div');
  separator.classList.add('board-separator');
  const vs = document.createElement('span');
  vs.innerText = 'vs';
  separator.appendChild(vs);

  return separator;
}