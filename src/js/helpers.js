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

// generates random direction
export function randomDirection() {
  return Math.random() > 0.5 ? 'vertical' : 'horizontal';
}