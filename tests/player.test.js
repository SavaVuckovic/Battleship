import { Player, ComputerPlayer } from '../src/js/player';

describe('Player instance behaves correctly', () => {
  const player = new Player('Sava');

  test('has correct instance variables when created', () => {
    expect(player.name).toBe('Sava');
    expect(player.human).toBeTruthy();
  });
});

describe('ComputerPlayer instance behaves correctly', () => {
  const player = new ComputerPlayer();

  test('has correct instance variables when created', () => {
    const expectedObj = {
      horizontal: [],
      vertical: []
    };

    expect(player.name).toBe('Computer');
    expect(player.human).toBeFalsy();
    expect(player.smart).toBeFalsy();
    expect(player.lastHit).toBeFalsy();
    expect(player.directionToAttack).toBe('vertical');
    expect(player.alreadyPlayedSlots).toEqual(expect.arrayContaining([]));
    expect(player.possibleSlots).toEqual(expect.objectContaining(expectedObj));
  });

  test('enters smart guessing mode correctly', () => {
    player.smartGuessMode('A1');
    const expectedObj = {
      horizontal: ['A2'],
      vertical: ['B1']
    };

    expect(player.smart).toBeTruthy();
    expect(player.lastHit).toBe('A1');
    expect(player.possibleSlots).toEqual(expect.objectContaining(expectedObj));
  });

  test('exits smart guessing mode correctly', () => {
    player.stopSmartGuessing();
    const expectedObj = {
      horizontal: [],
      vertical: []
    };

    expect(player.smart).toBeFalsy();
    expect(player.lastHit).toBeFalsy();
    expect(player.possibleSlots).toEqual(expect.objectContaining(expectedObj));
  });

  test('returns valid guess when attacking', () => {
    const guess = player.attack();

    expect(typeof guess).toBe('string');
    expect(guess[0]).toEqual(expect.stringMatching(/[A-J]/));
    expect(Number(guess.substring(1))).toBeGreaterThanOrEqual(1);
    expect(Number(guess.substring(1))).toBeLessThanOrEqual(10);
  });
});