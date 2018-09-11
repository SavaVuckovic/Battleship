export class Player {

  constructor(name) {
    this.name = name;
  }

  attack(slot) {
    // perform an attack
  }

}

export class ComputerPlayer extends Player {

  attack() {
    // randomly guess a slot, don't repeat slot twice
  }

}