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

  const getPixel = (cycle, X) => {
    const column = (cycle - 1) % COLS;

    if ([X - 1, X, X + 1].includes(column)) {
      return '#';
    }
    return '.';
  };

  const updateScreen = (screen, X, cycle) => {
    const row = parseInt((cycle - 1) / COLS);
    const col = (cycle - 1) % COLS;

    screen[row][col] = getPixel(cycle, X);
  };

  const COLS = 40;
  const ROWS = 6;

  const main = () => {
    const operations = readData();
    let X = 1;
    const total = 0;
    let cycle = 1;
    const screen = new Array(ROWS).fill('.').map((row) => new Array(COLS).fill(' '));

    for (const [operation, argument] of operations) {
      if (operation == 'noop') {
        updateScreen(screen, X, cycle);
        cycle++;
      } else {
        for (let loop = 0; loop < 2; loop++) {
          updateScreen(screen, X, cycle);
          cycle++;
        }
        X += Number(argument);
      }
    }

    console.log('The screen is');
    screen.forEach((row) => console.log(row.join('')));
  };

  main();
};
