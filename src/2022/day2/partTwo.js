const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }
  
  function main() {
    let score = 0;
    const data = getData();
    for (const game of data) {
      [rival, whatShouldIDo] = game.split(' ');
      score += utils.getPlayScoreFollowingStrategy(rival, whatShouldIDo);
    }
    console.log(`The final score is ${score}`);
  }
  
  main();
};
