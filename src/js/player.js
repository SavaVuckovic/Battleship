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
    this.directionToAttack = 'vertical';
    this.alreadyPlayedSlots = [];
    this.possibleSlots = {
      horizontal: [],
      vertical: []
    };
  }

  // decide which slot to attack
  attack() {
    let guess;
    if (this.smart) {
      let stop = false;
      while(!stop) {
        guess = this.smartGuess();
        if (this.alreadyPlayedSlots.indexOf(guess) === -1) {
          this.alreadyPlayedSlots.push(guess);
          stop = true;
          return guess;
        }
      }
    } else {
      let stop = false;
      while(!stop) {
        guess = randomPosition();
        if (this.alreadyPlayedSlots.indexOf(guess) === -1) {
          this.alreadyPlayedSlots.push(guess);
          stop = true;
          return guess;
        }
      }
    }
  }

  // make a smart guess
  smartGuess() {
    console.log(this.possibleSlots);
    if (this.possibleSlots[this.directionToAttack].length > 0) {
      return this.possibleSlots[this.directionToAttack].pop();
    } else {
      this.flipDirection();
      return this.possibleSlots[this.directionToAttack].pop();
    }
  }

  // flip the direction to attack
  flipDirection() {
    if (this.directionToAttack === 'vertical') {
      this.directionToAttack = 'horizontal';
    } else {
      this.directionToAttack = 'vertical';
    }
  }

  // enter smart guessing mode
  smartGuessMode(lastHit) {
    this.smart = true;
    this.lastHit = lastHit;
    const morePossibleSlots = generatePossibleSlots(lastHit);
    
    this.possibleSlots.horizontal = [...this.possibleSlots.horizontal, ...morePossibleSlots.horizontal];
    this.possibleSlots.vertical = [...this.possibleSlots.vertical, ...morePossibleSlots.vertical];
  }

  // exit smart guessing mode
  stopSmartGuessing() {
    this.smart = false;
    this.lastHit = false;
    this.possibleSlots = {
      horizontal: [],
      vertical: []
    };
  }
}