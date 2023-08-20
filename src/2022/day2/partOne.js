const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = () => {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function main() {
    const data = getData();
    let score = 0;

    for (const game of data) {
      const plays = game.split(' ');
      score += utils.getPlayScore(plays[0], plays[1]);
    }

    console.log(`The final score is ${score}`);
  }

  main();
};
