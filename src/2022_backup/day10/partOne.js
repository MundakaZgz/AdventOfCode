const fs = require('fs');
const path = require('path');

module.exports = function () {
  const textFilePath = path.join(__dirname, 'input.txt');

  const readData = () => {
    const data = fs
      .readFileSync(textFilePath, 'utf-8')
      .split(/\r?\n/)
      .map((row) => row.split(' '));

    return data;
  };

  const main = () => {
    const operations = readData();
    let X = 1;
    let total = 0;
    let cycle = 1;

    for (const [operation, argument] of operations) {
      if (cycle % 40 == 20) {
        total += cycle * X;
      }
      cycle += 1;

      if (operation == 'addx') {
        if (cycle % 40 == 20) {
          total += cycle * X;
        }
        X += Number(argument);
        cycle += 1;
      }
    }

    console.log(`The sum of the signals is ${total}`);
  };

  main();
};
