// validates player name
export function nameIsValid (name){
  if (name.length === 0) {
    return 'Name cannot be empty';
  } else if (name.length > 60) {
    return 'Name cannot be longer than 60 characters';
  } else {
    return 'Valid';
  }
}

// generates random board position
export function randomPosition() {
  const abcd = 'ABCDEFGHIJ';
  const x = abcd[Math.floor(Math.random() * abcd.length)];
  const y = Math.floor(Math.random() * 10) + 1;
  
  return `${x}${y}`;
}

// generates an object with possible slots that computer can attack
 export function generatePossibleSlots(rootSlot) {
  const abcd = 'ABCDEFGHIJ';
  const result = {
    vertical: [],
    horizontal: []
  };
  
  const x = abcd.indexOf(rootSlot[0]);
  const y = Number(rootSlot.substring(1));

  // top
  if (x - 1 > -1) {
    result.vertical.push(`${abcd[x - 1]}${y}`);
  }
  // bottom
  if (x + 1 <= 9) {
    result.vertical.push(`${abcd[x + 1]}${y}`);
  }
  // left
  if (y - 1 > 0) {
    result.horizontal.push(`${abcd[x]}${y - 1}`);
  }
  // right
  if (y + 1 <= 10) {
    result.horizontal.push(`${abcd[x]}${y + 1}`);
  }
  
  return result;
}

// generates random ship positions, vertical or horizontal
export function randomShipPositions(startPos, shipLength) {
  if (randomDirection() === 'horizontal') {
    return horizontalPositions(startPos, shipLength);
  } else {
    return verticalPositions(startPos, shipLength);
  }
}

function randomDirection() {
  return Math.random() > 0.5 ? 'vertical' : 'horizontal';
}

// generates horizontal positions
function horizontalPositions(startPos, shipLength) {
  const startY = Number(startPos.substring(1));
  const positions = [startPos];

  if (startY <= 6) {
    for (var i = startY + 1; i < (startY + shipLength); i++) {
      positions.push(`${startPos[0]}${i}`);
    }
  } else {
    for (var i = startY - 1; i > (startY - shipLength); i--) {
      positions.push(`${startPos[0]}${i}`);
    }
  }

  return positions;
}

// generates vertical positions
function verticalPositions(startPos, shipLength) {
  const startX = startPos[0];
  const positions = [startPos];

  if (startX.charCodeAt() <= 'F'.charCodeAt()) {
    for (var i = 1; i < shipLength; i++) {
      const x = String.fromCharCode(startX.charCodeAt() + i);
      positions.push(`${x}${startPos.substring(1)}`);
    }
  } else {
    for (var i = 1; i < shipLength; i++) {
      const x = String.fromCharCode(startX.charCodeAt() - i);
      positions.push(`${x}${startPos.substring(1)}`);
    }
  }

  return positions;
}