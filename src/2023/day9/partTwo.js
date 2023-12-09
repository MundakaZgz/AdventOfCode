const fs = require('fs');
const path = require('path');

module.exports = function () {
    
    function getData() {
        const textFilePath = path.join(__dirname, 'input.txt');
        const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
        return data;
    }

    function getCleanHistory(line) {  
      return [line.split(' ').map(x => parseInt(x.trim()))];
    }

    function calculateDifferences(history) {
      let lineIndex = 0;
      let allZeroes = false;
      do {
        history.push([]);
        let currentLine = history[lineIndex];
        for (let i = 0; i < currentLine.length; i++) {
          history[lineIndex + 1][i] = currentLine[i + 1] - currentLine[i];
        }
        allZeroes = history[lineIndex + 1].filter(Number).every(x => x === 0);
        lineIndex++;
      } while (!allZeroes);
    }

    function interpolateFirstNumber(history) {
      for (let currentLineIndex = history.length - 1; currentLineIndex > 0; currentLineIndex--) {
        let previousLineIndex = currentLineIndex - 1;
        let currentLine = history[currentLineIndex].filter(x => !isNaN(x));
        let previousLine = history[previousLineIndex].filter(x => !isNaN(x));

        currentLine = [currentLine[0], ...currentLine];
        let newValue = previousLine[0] - currentLine[0];
        previousLine = [newValue, ...previousLine];
  
        history[currentLineIndex] = currentLine;
        history[previousLineIndex] = previousLine;
  
      }
    }
   function getNextValue(line) {
      let history = getCleanHistory(line);
      calculateDifferences(history);
      interpolateFirstNumber(history);

      return history[0][0];
    }

    const main = () => {
        let data = getData();
        let histories = data.map(getNextValue);
        console.log(`The sum of all extrapolated numbers is: ${histories.reduce((a, b) => a + b, 0)}`);
    };
    
    main();

};

