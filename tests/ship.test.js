import Ship from '../src/js/ship';

const ship = new Ship('Submarine', ['A1', 'A2', 'A3']);

test('Ship instance has correct instance variables', () => {
  const expectedPosObj = {
    'A1': 'O',
    'A2': 'O',
    'A3': 'O'
  };

  expect(ship.name).toBe('Submarine');
  expect(ship.positions).toEqual(expect.objectContaining(expectedPosObj));
});

test('ship takes a hit correctly', () => {
  ship.hit('A1');
  const expectedPosObj = {
    'A1': 'X',
    'A2': 'O',
    'A3': 'O'
  };

  expect(ship.positions).toEqual(expect.objectContaining(expectedPosObj));
});

test('isSunk() method returns true if all positions are hit', () => {
  ship.hit('A1');
  ship.hit('A2');
  ship.hit('A3');

  expect(ship.isSunk()).toBeTruthy();
});

test('isSunk() method returns false if not all positions are hit', () => {
  const ship = new Ship('Submarine', ['A1', 'A2', 'A3']);
  ship.hit('A2');
  ship.hit('A3');

  expect(ship.isSunk()).toBeFalsy();
});