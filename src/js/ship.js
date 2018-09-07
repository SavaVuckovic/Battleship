export default (length) => {
  // ship positions
  const positions = [];

  // populate positions
  for (let i = 0; i < length; i++) {
    positions.push('O');
  }

  // change position from safe (O) to hit (X)
  const hit = (index) => {
    positions[index] = 'X';
  };

  // check if ship is sunk (all positions are hit)
  const isSunk = () => {
    return positions.every((position) => position === 'X');
  }

  return {
    positions,
    hit,
    isSunk
  };
};