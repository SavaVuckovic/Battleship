import Ship from './ship';
import { 
  randomPosition,
  randomPositions
} from './helpers';

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
      let startPos = randomPosition();
      let positions = randomPositions(startPos, ship[1]);
      
      // make sure that no ship already exists at that location
      let stop = false;

      while (!stop) {
        let found = false;
        positions.forEach(pos => {
          if (this.foundShip(pos)) {
            found = true;
            startPos = randomPosition();
            positions = randomPositions(startPos, ship[1]);
          }
        });

        if (!found) {
          stop = true;
        }
      };
      
      // instantiate new ship object with generated positions
      const newShip = new Ship(ship[0], positions);
      // change board slots that ship occupies
      positions.forEach(pos => this.slots[pos] = newShip.name);
      // add to board ships
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
    let found = false;
    this.ships.forEach(ship => {
      Object.keys(ship.positions).forEach(pos => {
        if (pos === coordinates) {
          found = true;
        }
      });
    });

    return found;
  }

  allShipsSunk() {
    // return true if all ships are sunk and false otherwise
  }
};