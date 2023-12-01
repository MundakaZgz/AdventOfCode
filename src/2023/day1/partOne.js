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

    let values = [];
    const digitRegex = /(\d)/g;

    for (const line of data) {
        let match = line.match(digitRegex);
        firstDigit = parseInt(match[0]);
        lastDigit = parseInt(match[match.length - 1]);
        values.push(firstDigit * 10  + lastDigit);
    }
    
    const result = values.reduce((acc, curr) => acc + curr, 0);
    
    console.log(`The sum of all values is ${result}`);
  };
  
  main();
};

