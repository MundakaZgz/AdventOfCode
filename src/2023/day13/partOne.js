const fs = require('fs');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }
  
  function findMirrorIndexes(matrix) {
    let possibleIndexes = [];
    
    for(let i=0; i<matrix.length-1; i++) {
      let row = matrix[i];
      let rowArray = row.split('');
      
      let newPossibleIndexes = [];
      for(let j=0; j<rowArray.length; j++) {
        let thereIsMirror = true;
        let distanceToMirror = Math.min(j, rowArray.length - j - 1);
        
        if(distanceToMirror === 0) {
          continue;
        }
        
        for(let k=0; k<distanceToMirror; k++) {
          if(rowArray[j-k] !== rowArray[j+k+1]) {
            thereIsMirror = false;
            break;
          }
        }
        
        if(thereIsMirror) {
          newPossibleIndexes.push(j);
        }
      }
      
      // Intersect newPossibleIndexes with possibleIndexes
      if(i === 0) {
        possibleIndexes = newPossibleIndexes;
      } else {
        possibleIndexes = possibleIndexes.filter(index => newPossibleIndexes.includes(index));
      }
    }
    
    // update to 1-based index
    possibleIndexes = possibleIndexes.map(index => index + 1);
    
    return possibleIndexes;
  }
  
  function transposeMatrix(matrix) {
    let newMatrix = [];
    newMatrix =  matrix.map(row => row.split(''));
    newMatrix = newMatrix[0].map((col, i) => newMatrix.map(row => row[i]));
    return newMatrix.map(row => row.join(''));
  }
  
  printMatrix = (matrix) => {
    for(const row of matrix) {
      console.log(row);
    }
  }
  
  const main = () => {
    let data = getData();
    data.push('');
    
    let pattern = [];
    let numberOfColumnsToTheLeft = 0;
    let numberOfRowsAbove = 0;
    let numberOfPattern = 0;
    
    for(const line of data) {
      if(line === '') {
        if(numberOfPattern % 2 == 0) {
          numberOfColumnsToTheLeft += findMirrorIndexes(pattern).reduce((a, b) => a + b, 0);
        } else {    
          pattern = transposeMatrix(pattern);
          numberOfRowsAbove += findMirrorIndexes(pattern).reduce((a, b) => a + b, 0);
        }
        pattern = [];
        numberOfPattern++;
      } else {
        pattern.push(line);
      }
    }
    
    let result = numberOfColumnsToTheLeft + 100 * numberOfRowsAbove;
    
    console.log(`The number I get after summarizing all of your notes is ${result}`)
  };
  
  main();
};
