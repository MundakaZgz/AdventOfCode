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

    let numberOfGreens = [...data.matchAll(regGreen)].map((match) => parseInt(match[1]));
    let numberOfReds = [...data.matchAll(regRed)].map((match) => parseInt(match[1]));
    let numberOfBlues = [...data.matchAll(regBlue)].map((match) => parseInt(match[1]));

    return {numberOfGreens, numberOfReds, numberOfBlues};

  }

  function getGameNumber(data) {
    const reg = /Game (\d+):/g;
    const match = [...data.matchAll(reg)];
    return parseInt(match[0][1]);
  }

  const main = () => {
    const data = getData();

    const maxGreens = 13;
    const maxReds = 12;
    const maxBlues = 14;

    const result = data.filter((line) => {
      const {numberOfGreens, numberOfReds, numberOfBlues} = sumarizeGame(line);

      const exceedsGreens = (element) => element > maxGreens;
      const exceedsReds = (element) => element > maxReds;
      const exceedsBlues = (element) => element > maxBlues;
     
      return !(numberOfGreens.some(exceedsGreens) || numberOfReds.some(exceedsReds) || numberOfBlues.some(exceedsBlues));
    });

    const gameNumbers = result.map((line) => getGameNumber(line));

    console.log(`The sum of the games that are possible is ${gameNumbers.reduce((a, b) => a + b, 0)}`)

  };
  
  main();
};

