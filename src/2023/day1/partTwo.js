const fs = require('fs');
const { get } = require('http');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function dataToValues(data) {
    switch (data) {
      case 'one':
        return 1;
      case 'two':
        return 2;
      case 'three':
        return 3;
      case 'four':
        return 4;
      case 'five':
        return 5;
      case 'six':
        return 6;
      case 'seven':
        return 7;
      case 'eight':
        return 8;
      case 'nine':
        return 9;
      default:
        return parseInt(data);
    }
  }

  function getRecognizedDigitFromPosition(data, position) {
    const remainingData = data.slice(position);
    const digitRegex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
    const match = [...remainingData.matchAll(digitRegex)];
    if (match.length > 0) {
      return dataToValues(match[0][0]);
    } else {
      return -1;
    }
  }

  const main = () => {
    const data = getData();
    
    let values = [];
    for (const line of data) {
      let firstDigit = dataToValues(getRecognizedDigitFromPosition(line, 0));
      let lastDigit;
      for (let i = 0; i < line.length; i++) {
        if(getRecognizedDigitFromPosition(line, i) !== -1) {
          lastDigit = dataToValues(getRecognizedDigitFromPosition(line, i));
        }
      }
      values.push(firstDigit * 10  + lastDigit);
    }

    const result = values.reduce((acc, curr) => acc + curr, 0);
    
    console.log(`The sum of all values is ${result}`);
  };
  
  main();
};

