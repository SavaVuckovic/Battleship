import {
  nameIsValid,
  randomPosition,
  generatePossibleSlots,
  randomShipPositions
} from '../src/js/helpers';

test('nameIsValid() returns correct values', () => {
  const tooLongName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  
  expect(nameIsValid('')).toBe('Name cannot be empty');
  expect(nameIsValid(tooLongName)).toBe('Name cannot be longer than 60 characters');
  expect(nameIsValid('Sava')).toBe('Valid');
});

test('randomPosition() returns correct coordinates', () => {
  const coordinates = randomPosition();

  expect(typeof coordinates).toBe('string');
  expect(coordinates[0]).toEqual(expect.stringMatching(/[A-J]/));
  expect(Number(coordinates.substring(1))).toBeGreaterThanOrEqual(1);
  expect(Number(coordinates.substring(1))).toBeLessThanOrEqual(10);
});

test('generatePossibleSlots() returns valid positions', () => {
  expect(generatePossibleSlots('A1'))
    .toEqual(expect.objectContaining({horizontal: ['A2'], vertical: ['B1']}));
  expect(generatePossibleSlots('A2'))
    .toEqual(expect.objectContaining({horizontal: ['A1', 'A3'], vertical: ['B2']}));
  expect(generatePossibleSlots('B2'))
    .toEqual(expect.objectContaining({horizontal: ['B1', 'B3'], vertical: ['A2', 'C2']}));
  expect(generatePossibleSlots('J10'))
    .toEqual(expect.objectContaining({horizontal: ['J9'], vertical: ['I10']}));
});

test('randomShipPositions() returns valid horizontal positions', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.3;
  global.Math = mockMath;

  expect(randomShipPositions('A2', 3)).toEqual(expect.arrayContaining(['A2', 'A3', 'A4']));
  expect(randomShipPositions('B9', 4)).toEqual(expect.arrayContaining(['B9', 'B8', 'B7', 'B6']));
});

test('randomShipPositions() returns valid vertical positions', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.7;
  global.Math = mockMath;

  expect(randomShipPositions('A2', 3)).toEqual(expect.arrayContaining(['A2', 'B2', 'C2']));
  expect(randomShipPositions('H5', 4)).toEqual(expect.arrayContaining(['H5', 'G5', 'F5', 'E5']));
});