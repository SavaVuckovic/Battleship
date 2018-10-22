import Ship from './ship';
import { 
  randomPosition,
  randomShipPositions
} from './helpers';

export default class Gameboard {

  constructor() {    
    this.slots = {};
    this.ships = [];
    this.lastSunkShipInfo = {};
  }

  setup() {
    this.slots = {};
    this.ships = [];
    this.generateSlots();
    this.placeShips();
  }

  generateSlots() {
    'ABCDEFGHIJ'.split('').forEach(letter => {
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
      let positions = randomShipPositions(startPos, ship[1]);
      
      // make sure that no ship already exists at that location
      let stop = false;

      while (!stop) {
        let found = false;
        positions.forEach(pos => {
          if (this.foundShip(pos)) {
            found = true;
            startPos = randomPosition();
            positions = randomShipPositions(startPos, ship[1]);
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

  receiveAttack(coordinates) {
    const ship = this.foundShip(coordinates);
    if (ship) {
      // if ship exists
      ship.hit(coordinates);
      if (ship.isSunk()) {
        // when ship is destroyed
        const positions = Object.keys(ship.positions);
        positions.forEach(pos => this.updateBoardSlot(pos, 'sunk'));
        this.updateLastSunkShip(ship.name, Object.keys(ship.positions));
        return 'sunk';
      } else {
        // when ship is hit but not destroyed
        this.updateBoardSlot(coordinates, 'hit');
        return 'hit';
      }
    } else {
      // ship doesn't exist at a given location
      this.updateBoardSlot(coordinates, 'miss');
      return 'miss';
    }
  }

  // return ship if it exists in given position, and false otherwise
  foundShip(coordinates) {
    let found = false;

    this.ships.forEach(ship => {
      Object.keys(ship.positions).forEach(pos => {
        if (pos === coordinates) found = ship;
      });
    });

    return found;
  }

  updateBoardSlot(coordinates, value) {
    this.slots[coordinates] = value;
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  // update the information about last ship that is sunk
  updateLastSunkShip(shipName, positions) {
    this.lastSunkShipInfo.name = shipName;
    this.lastSunkShipInfo.positions = positions;
  }

  // get the info about last ship that is sunk
  getLastSunkShip() {
    return this.lastSunkShipInfo;
  }
};