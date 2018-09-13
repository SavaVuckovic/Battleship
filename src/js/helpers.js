// validates player name
export function nameIsValid (name){
  if (name.length === 0) {
    return 'Name cannot be empty';
  } else if (name.length > 56) {
    return 'Name cannot be longer than 56 characters';
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

// generates random ship positions, vertical or horizontal
export function randomPositions(startPos, shipLength) {
  const direction =  Math.random() > 0.5 ? 'vertical' : 'horizontal';
  const positions = [];
  positions.push(startPos);

  if (direction === 'horizontal') {
    const startY = Number(startPos.substring(1));
    if (startY <= 6) {
      for (var i = startY + 1; i < (startY + shipLength); i++) {
        positions.push(`${startPos[0]}${i}`);
      }
    } else {
      for (var i = startY - 1; i > (startY - shipLength); i--) {
        positions.push(`${startPos[0]}${i}`);
      }
    }
  } else {
    const startX = startPos[0];
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
  }

  return positions
}