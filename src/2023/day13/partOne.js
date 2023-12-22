const fs = require('fs');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function transpose(matrix) {
    let arrayOfArrays = matrix.map(row => row.split(''));
    let transposedMatrix = arrayOfArrays[0].map((col, i) => arrayOfArrays.map(row => row[i]));
    return transposedMatrix.map(row => row.join(''));
  }

  function findMirrorIndexes(matrix) {
    let possibleIndexes = [];

    for(let i=0; i<matrix.length-1; i++) {
        let row = matrix[i];
        let rowArray = row.split('');
        let rowStringReversed = rowArray.toReversed();
        let thereIsMirror = true;
        let distanceToMirror = Math.min(i, row.length - i - 1);

        for(let j=0; j<distanceToMirror; j++) {
            if(rowArray[i-j] !== rowStringReversed[j+i+1]) {
                thereIsMirror = false;
                break;
            }
        }

        if(thereIsMirror) {
            possibleIndexes.push(i);
        } else {
            if(possibleIndexes.indexOf(i) > -1) {
                possibleIndexes.splice(possibleIndexes.indexOf(i), 1);
            }
        }
    }

    // 1-based indexes
    possibleIndexes = possibleIndexes.map(index => index + 1);
    console.log(possibleIndexes);

    return possibleIndexes;
  }
  
  const main = () => {
    let data = getData();
    data.push('');
    
    let pattern = [];
    let numberOfColumnsToTheLeft = 0;
    let numberOfColumnsAbove = 0;

    for(const line of data) {
        if(line === '') {
            numberOfColumnsToTheLeft += findMirrorIndexes(pattern).reduce((a, b) => a + b);
            pattern = transpose(pattern);
            numberOfColumnsAbove += findMirrorIndexes(pattern).reduce((a, b) => a + b);
            pattern = [];
        } else {
            pattern.push(line);
        }
    }

    let result = numberOfColumnsToTheLeft + 100 * numberOfColumnsAbove;
    
    console.log(`The number I get after summarizing all of your notes is ${result}`)
  };
  
  main();
};

