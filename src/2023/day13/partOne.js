const fs = require('fs');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\n\n/);
    return data;
  }
  
  function findMirrorIndexes(matrix) {
    let possibleIndexes = [];
    
    let thereIsMirror = true;
    
    for(row of matrix) {

      for(let i=0; i<row.length; i++) {
        let distanceToMirror = Math.min(Math.abs(i - 1), Math.abs(row.length - i - 1));
        if(distanceToMirror === 0) {
            continue;
        }
        for(let j=0; j<distanceToMirror; j++) {
          if(row[i-j-1] !== row[j+i]) {
            thereIsMirror = false;
            break;
          }
        }
        if(thereIsMirror) {
          console.log(`There is mirror in row ${row} at index ${i}`);
          if(!possibleIndexes.includes(i+1)){
            possibleIndexes.push(i+1);
          }
        } else {
          possibleIndexes.splice(possibleIndexes.indexOf(i+1), 1);
        }
      }
    }
    
    return possibleIndexes;
  }
  
  function transposeMatrix(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  }
  
  printMatrix = (matrix) => {
    for(const row of matrix) {
      console.log(row.join(''));
    }
  }
  
  const main = () => {
    let patterns = getData();
  
    let numberOfColumnsToTheLeft = 0;
    let numberOfRowsAbove = 0;
    let numberOfPattern = 0;
    
    for(const pattern of patterns) {
      console.log(pattern);
      const patternMatrix = pattern.split('\n').map(row => row.split(''));
      printMatrix(patternMatrix);
      let possibleIndexes = findMirrorIndexes(patternMatrix);
      let possibleRowIndexes = findMirrorIndexes(transposeMatrix(patternMatrix));
      console.log(possibleIndexes);
      console.log(possibleRowIndexes);
    }
    
    let result = numberOfColumnsToTheLeft + 100 * numberOfRowsAbove;
    
    console.log(`The number I get after summarizing all of your notes is ${result}`)
  };
  
  main();
};
