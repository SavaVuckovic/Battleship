export default class Gameboard {

  constructor() {    
    this.slots = {};
    this.ships = [];

    // generate board slots
    const abcd = 'ABCDEFGHIJ';
    abcd.split('').forEach(letter => {
      for (var i = 1; i <= 10; i++) {
        this.slots[`${letter}${i}`] = 'empty';
      }
    });

    // generate ships (place them randomly)
    // ....
  }

  // receive an attack from enemy
  receiveAttack(coordinates) {
    // if ship is there
      // call hit method on that ship
    // else
      // shot is missed
  }

  // check if ship exists in given position
  foundShip(coordinates) {

  }

  allShipsSunk() {
    // return true if all ships are sunk and false otherwise
  }
};