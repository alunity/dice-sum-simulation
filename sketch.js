THROWS = 1000000;
DICES = 20;

function dice() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

class normalDistro {
  constructor(throws, dices) {
    this.throws = throws;
    this.dices = dices;
    this.results = this.simulateDiceThrows();
    this.dimensions = this.calculateDimension();
  }

  simulateDiceThrows() {
    let results = {};

    // prettier-ignore
    for (let i = this.dices; i <= (6 * this.dices); i++) {
      results[i] = 0;
    }

    for (let i = 0; i < this.throws; i++) {
      let sum = 0;
      for (let j = 0; j < this.dices; j++) {
        sum += dice();
      }
      results[sum] += 1;
    }
    return results;
  }

  calculateDimension() {
    let numberOfCols = 6 * this.dices - (this.dices - 1);
    let widthOfCols = ((width / 10) * 8) / numberOfCols;
    let highestValue = Object.values(this.results);
    highestValue.sort((firstEl, secondEl) => secondEl - firstEl);
    highestValue = highestValue[0];
    let oneUnit = (((height / 10) * 8) / highestValue) * 0.75;

    return [widthOfCols, oneUnit];
  }

  display() {
    rect(width / 10, height / 10, (width / 10) * 8, (height / 10) * 8);
    for (let i = 0; i < Object.keys(this.results).length; i++) {
      let number = Object.keys(this.results)[i];
      let heightOfBar = this.dimensions[1] * this.results[number];
      let widthOfBar = this.dimensions[0];
      let yPos = (height / 10) * 9 - heightOfBar;
      rect(width / 10 + widthOfBar * i, yPos, widthOfBar, heightOfBar);
    }
  }
}

// This is very misleading
// But i don't know what to name it rn
let app;

function setup() {
  createCanvas(1000, 1000);
  app = new normalDistro(THROWS, DICES);
}

function draw() {
  background(220);
  app.display();
}

// console.log(simulateDiceThrows(THROWS, DICES))
