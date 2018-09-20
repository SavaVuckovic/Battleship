import Gameboard from '../src/js/gameboard';
import Ship from '../src/js/ship';

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