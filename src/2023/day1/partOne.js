const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  const main = () => {
    const data = getData();

    const values = [];
    const digitRegex = /(\d)/g;

    for (const line of data) {
      const match = line.match(digitRegex);
      const firstDigit = parseInt(match[0]);
      const lastDigit = parseInt(match[match.length - 1]);
      values.push(firstDigit * 10 + lastDigit);
    }

    const result = values.reduce((acc, curr) => acc + curr, 0);

    console.log(`The sum of all values is ${result}`);
  };

  main();
};
