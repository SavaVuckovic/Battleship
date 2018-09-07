export default class Gameboard {

  constructor() {
    // generate board slots
    this.slots = [];
    const abcd = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    abcd.forEach(letter => {
      for (var i = 1; i <= 10; i++) {
        this.slots.push(`${letter}${i}`);
      }
    });

    console.log(this.slots);
  }

  // receive an attack from enemy
  receiveAttack(coordinates) {
    console.log('wait');
  }
};