const fs = require('fs');
const path = require('path');

module.exports = () => {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const elves = [0];
    let elfNumber = 0;
    data.split(/\r?\n/).forEach((line) => {
      if (line === '') {
        elfNumber++;
        elves[elfNumber] = 0;
      } else {
        elves[elfNumber] += parseInt(line, 10);
      }
    });

    const topThreeElves = elves.sort((a, b) => b - a).slice(0, 3);
    const topThreeCaloriesSum = topThreeElves.reduce((acc, curr) => acc + curr);

    console.log(`The sum of the calories of the top 3 elves ${topThreeElves} is ${topThreeCaloriesSum}`);
    console.log(Math.max(...elves));
  });
};
