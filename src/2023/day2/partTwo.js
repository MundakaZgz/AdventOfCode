const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function sumarizeGame(data) {
    const regGreen = /(\d+) green/g;
    const regRed = /(\d+) red/g;
    const regBlue = /(\d+) blue/g;

    const numberOfGreens = [...data.matchAll(regGreen)].map((match) => parseInt(match[1], 10));
    const numberOfReds = [...data.matchAll(regRed)].map((match) => parseInt(match[1], 10));
    const numberOfBlues = [...data.matchAll(regBlue)].map((match) => parseInt(match[1], 10));

    return { numberOfGreens, numberOfReds, numberOfBlues };
  }

  function getDiceSetPower(game) {
    const minGreens = game.numberOfGreens.reduce((a, b) => Math.max(a, b));
    const minReds = game.numberOfReds.reduce((a, b) => Math.max(a, b));
    const minBlues = game.numberOfBlues.reduce((a, b) => Math.max(a, b));
    return minGreens * minReds * minBlues;
  }

  const main = () => {
    const data = getData();
    const result = data.map(sumarizeGame).map(getDiceSetPower).reduce((a, b) => a + b, 0);

    console.log(`The sum of the power of the sets is ${result}`);
  };

  main();
};
