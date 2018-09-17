import { randomPosition } from './helpers';

export default class Player {

  constructor(name, human = true) {
    this.name = name;
    this.human = human;
  }

  // used by computer player to randomly generate a slot to attack
  attack(slot) {
    return randomPosition();
  }
}