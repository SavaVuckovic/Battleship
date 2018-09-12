import Ship from './ship';
import { randomPosition, randomDirection } from './helpers';

export default class Gameboard {

  constructor() {    
    this.slots = {};
    this.ships = [];
  }

  // generates the board and places ships
  setup() {
    this.generateSlots();
    this.placeShips();
  }

  // generates board slot grid
  generateSlots() {
    const abcd = 'ABCDEFGHIJ';
    abcd.split('').forEach(letter => {
      for (var i = 1; i <= 10; i++) {
        this.slots[`${letter}${i}`] = 'empty';
      }
    });
  }

  // places ships randomly
  placeShips() {
    const shipsToGenerate = [
      ['Carrier', 5],
      ['Battleship', 4],
      ['Cruiser', 3],
      ['Submarine', 3],
      ['Destroyer', 2]
    ];

    shipsToGenerate.forEach(ship => {
      const startPos = randomPosition();
      const direction = randomDirection();
      let positions = [startPos];

      // generate other ship positions based on direction
      if (direction === 'vertical') {
        const startY = Number(startPos[1]);
        if (startY <= 6) {
          for (var i = startY + 1; i < (startY + ship[1]); i++) {
            positions.push(`${startPos[0]}${i}`);
          }
        } else {
          for (var i = startY - 1; i > (startY - ship[1]); i--) {
            positions.push(`${startPos[0]}${i}`);
          }
        }
      } else {
        const startX = startPos[0];
        if (startX.charCodeAt() <= 'F'.charCodeAt()) {
          for (var i = 1; i < ship[1]; i++) {
            const x = String.fromCharCode(startX.charCodeAt() + i);
            positions.push(`${x}${startPos[1]}`);
          }
        } else {
          for (var i = 1; i < ship[1]; i++) {
            const x = String.fromCharCode(startX.charCodeAt() - i);
            positions.push(`${x}${startPos[1]}`);
          }
        }
      }

      const newShip = new Ship(ship[0], positions);
      console.log(newShip);

      // validations
      // ...

      this.ships.push(newShip);
    });
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