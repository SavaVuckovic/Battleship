import { randomPosition, generatePossibleSlots } from './helpers';

export class Player {
  constructor(name, human = true) {
    this.name = name;
    this.human = human;
  }
}

export class ComputerPlayer extends Player {
  constructor() {
    super('Computer', false);
    this.smart = false;
    this.lastHit = false;
    this.possibleSlots = {};
  }

  // decide which slot to attack
  attack() {
    if (this.smart) {
      ///...
      return 1;
    } else {
      return randomPosition();
    }
  }

  // enter smart guessing mode
  smartGuessMode(lastHit) {
    this.smart = true;
    this.lastHit = lastHit;
    this.possibleSlots = generatePossibleSlots(lastHit);
  }

  // exit smart guessing mode
  stopSmartGuessing() {
    this.smart = false;
    this.lastHit = false;
    this.possibleSlots = {};
  }
}