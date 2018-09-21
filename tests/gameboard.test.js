import Gameboard from '../src/js/gameboard';
import Ship from '../src/js/ship';

describe('board setup process works correctly', () => {
  const board = new Gameboard();

  test('Gameboard instance has correct instance variables', () => {
    expect(board.slots).toEqual(expect.objectContaining({}));
    expect(board.ships).toEqual(expect.arrayContaining([]));
    expect(board.lastSunkShipInfo).toEqual(expect.objectContaining({}));
  });
  
  test('setup() generates slots and places ships correctly', () => {
    board.setup();
    const boardSlotKeys = Object.keys(board.slots);
    const firstShip = board.ships[0];
    const lastShip = board.ships[4];
  
    expect(boardSlotKeys).toHaveLength(100);
    expect(boardSlotKeys[0]).toBe('A1');
    expect(boardSlotKeys[9]).toBe('A10');
    expect(boardSlotKeys[90]).toBe('J1');
    expect(boardSlotKeys[99]).toBe('J10');
  
    expect(board.ships).toHaveLength(5);
    expect(firstShip).toBeInstanceOf(Ship);
    expect(firstShip.name).toBe('Carrier');
    expect(Object.keys(firstShip.positions)).toHaveLength(5);
    expect(lastShip.name).toBe('Destroyer');
    expect(Object.keys(lastShip.positions)).toHaveLength(2);
  });
});

describe('board handles attacks correctly', () => {
  const board = new Gameboard();
  board.setup();
  const testShip = new Ship('Destroyer', ['A1', 'A2']);
  const testShipTwo = new Ship('Submarine', ['B1', 'B2', 'B3']);
  board.ships = [testShip, testShipTwo]; 

  test('receiveAttack() returns a correct value', () => {
    expect(board.receiveAttack('A1')).toBe('hit');
    expect(board.receiveAttack('E5')).toBe('miss');
    expect(board.receiveAttack('A2')).toBe('sunk');
  });
  
  test('allShipsSunk() returns false if not all ships are sunk', () => {  
    expect(board.allShipsSunk()).toBeFalsy();
  });

  test('allShipsSunk() returns true if all ships are sunk', () => {
    board.receiveAttack('B1');
    board.receiveAttack('B2');
    board.receiveAttack('B3');
    expect(board.allShipsSunk()).toBeTruthy();
  });

  test('updateLastSunkShip() correctly updates info about last sunk ship', () => {
    const sunkShipPositions = ['B1', 'B2', 'B3'];
    board.updateLastSunkShip('Submarine', sunkShipPositions);

    expect(board.lastSunkShipInfo.name).toBe('Submarine');
    expect(board.lastSunkShipInfo.positions).toEqual(expect.arrayContaining(sunkShipPositions));
  });

  test('getLastSunkShip() returns info about last sunk ship', () => {
    const sunkShipPositions = ['B1', 'B2', 'B3'];
    const info = board.getLastSunkShip();

    expect(info.name).toBe('Submarine');
    expect(info.positions).toEqual(expect.arrayContaining(sunkShipPositions));
  });
});
