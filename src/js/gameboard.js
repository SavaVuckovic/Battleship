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
      // update board slots that ship occupies
      positions.forEach(pos => this.updateBoardSlot(pos, newShip.name));
      // add to board ships
      this.ships.push(newShip);
    });
  }

  // receive an attack from enemy
  receiveAttack(coordinates) {
    const ship = this.foundShip(coordinates);
    if (ship) {
      ship.hit(coordinates);
      if (ship.isSunk()) {
        const positions = Object.keys(ship.positions);
        positions.forEach(pos => this.updateBoardSlot(pos, 'sunk'));
        return 'sunk';
      } else {
        this.updateBoardSlot(coordinates, 'hit');
        return 'hit';
      }
    } else {
      this.updateBoardSlot(coordinates, 'miss');
      return 'miss';
    }
  }

  // return ship if it exists in given position, and false otherwise
  foundShip(coordinates) {
    let found = false;
    this.ships.forEach(ship => {
      Object.keys(ship.positions).forEach(pos => {
        if (pos === coordinates) {
          found = ship;
        }
      });
    });

    return found;
  }

  // updates a value of a single board slot
  updateBoardSlot(coordinates, value) {
    this.slots[coordinates] = value;
  }

  // checks if all ships are sunk
  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
};