const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getCleanHistory(line) {
    return [line.split(' ').map((x) => parseInt(x.trim()))];
  }

  function calculateDifferences(history) {
    let lineIndex = 0;
    let allZeroes = false;
    do {
      history.push([]);
      const currentLine = history[lineIndex];
      for (let i = 0; i < currentLine.length; i++) {
        history[lineIndex + 1][i] = currentLine[i + 1] - currentLine[i];
      }
      allZeroes = history[lineIndex + 1].filter(Number).every((x) => x === 0);
      lineIndex++;
    } while (!allZeroes);
  }

  function interpolateNextNumber(history) {
    for (let currentLineIndex = history.length - 1; currentLineIndex > 0; currentLineIndex--) {
      const previousLineIndex = currentLineIndex - 1;
      const currentLine = history[currentLineIndex].filter((x) => !isNaN(x));
      const previousLine = history[previousLineIndex].filter((x) => !isNaN(x));

      currentLine.push(currentLine[currentLine.length - 1]);
      const newValue = currentLine[currentLine.length - 1] + previousLine[previousLine.length - 1];

      previousLine.push(newValue);

      history[currentLineIndex] = currentLine;
      history[previousLineIndex] = previousLine;
    }
  }

  function getNextValue(line) {
    const history = getCleanHistory(line);
    calculateDifferences(history);

    interpolateNextNumber(history);

    return history[0][history[0].length - 1];
  }

  const main = () => {
    const data = getData();
    const histories = data.map(getNextValue);
    console.log(`The sum of all extrapolated numbers is: ${histories.reduce((a, b) => a + b, 0)}`);
  };

  main();
};
