const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = () => {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let score = 0;

    data.split(/\r?\n/).forEach((game) => {
      const plays = game.split(' ');
      score += utils.getPlayScore(plays[0], plays[1]);
    });

    console.log(`The final score is ${score}`);
  });
};
