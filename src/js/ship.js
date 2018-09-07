export default class Ship {

  constructor(coordinates) {
    // populate ship positions
    this.positions = {};
    coordinates.forEach(c => {
      this.positions[c] = 'O';
    });
  }

  // change position from safe (O) to hit (X)
  hit(coordinates) {
    this.positions[coordinates] = 'X';
  }

  // check if all positions are hit
  isSunk() {
    return Object.values(this.positions).every(pos => pos === 'O');
  }
}