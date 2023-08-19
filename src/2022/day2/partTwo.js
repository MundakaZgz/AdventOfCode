const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = function () {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    score = 0;

    data.split(/\r?\n/).forEach((game) => {
      [rival, whatShouldIDo] = game.split(' ');
      score += utils.getPlayScoreFollowingStrategy(rival, whatShouldIDo);
    });

    console.log(`The final score is ${score}`);
  });
};
