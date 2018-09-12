export default class Ship {

  constructor(name, positions) {
    // populate ship positions
    this.name = name;
    this.positions = {};
    positions.forEach(pos => {
      this.positions[pos] = 'O';
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