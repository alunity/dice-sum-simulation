// Defaults
const THROWS = 10000;
const DICES = 50;

// Sliders
let throws = 10000;
let dices = 50;

function dice() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

class normalDistro {
  constructor(throws, dices) {
    this.init(throws, dices);
    console.log(this.results);
  }

  init(throws, dices) {
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
    fill(230);
    rect(width / 10, height / 10, (width / 10) * 8, (height / 10) * 8);
    fill("cyan");
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
  var canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  canvas.parent("sketch-holder");

  app = new normalDistro(THROWS, DICES);
}

function draw() {
  background(255);
  app.display();
}

function updateThrows(e) {
  throws = e.target.value;
  // console.log(e.target.value);
  updateGraph();
}

function updateDices(e) {
  dices = e.target.value;
  // console.log(e.target.value);
  updateGraph();
}

function updateGraph() {
  app.init(throws, dices);
}

document.getElementById("throws").addEventListener("input", updateThrows);
document.getElementById("dices").addEventListener("input", updateDices);
// console.log(simulateDiceThrows(THROWS, DICES))
