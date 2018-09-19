import { Player, ComputerPlayer } from '../src/js/player';

describe('Player instance behaves correctly', () => {
  const player = new Player('Sava');

  test('Player instance has correct instance variables when created', () => {
    expect(player.name).toBe('Sava');
    expect(player.human).toBeTruthy();
  });
});