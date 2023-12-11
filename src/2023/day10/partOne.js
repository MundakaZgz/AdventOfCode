const fs = require('fs');
const path = require('path');
const { off } = require('process');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }
  
  function getPipeMap(data) {
    let pipeMap = [];
    for(let row=0; row<data.length; row++) {
      let rowArray = data[row].split('');
      pipeMap.push([]);
      for(let col=0; col<rowArray.length; col++) {
        pipeMap[row].push({
          value: rowArray[col],
          visited: false,
        });
      }
    }
    return pipeMap;
  }
  
  function getStartingPoint(pipeMap) {
    for(let row=0; row<pipeMap.length; row++) {
      for(let col=0; col<pipeMap[row].length; col++) {
        if (pipeMap[row][col].value === 'S') {
          return {row, col, value: pipeMap[row][col].value};
        }
      }
    }
  }

  const NORTH = {vertical: -1, horizontal: 0};
  const SOUTH = {vertical: 1, horizontal: 0};
  const EAST = {vertical: 0, horizontal: 1};
  const WEST = {vertical: 0, horizontal: -1};

  const TILES_VALUES = ['|', '-', 'L', 'J', '7', 'F'];

  function getOffsites (cellValue) {
    switch (cellValue) {
      case '|':
        return [NORTH, SOUTH];
      case '-':
        return [EAST, WEST];
      case 'L':
        return [NORTH, EAST];
      case 'J':
        return [NORTH, WEST];
      case '7':
          return [SOUTH, WEST];
      case 'F':
          return [SOUTH, EAST];
      case 'S':
          return [NORTH, SOUTH, EAST, WEST];
      default:
        return [];
    }
  }

  function getNextPoint(currentPoint, pipeMap) {
    // calculate options
    let offsites = getOffsites(pipeMap[currentPoint.row][currentPoint.col].value);
    // check options
    for (let i=0; i<offsites.length; i++) {
      let option = offsites[i];
      let nextRow = currentPoint.row + option.vertical;
      let nextCol = currentPoint.col + option.horizontal;

     // if option is valid, return option
      if (pipeMap[nextRow] && pipeMap[nextRow][nextCol] && pipeMap[nextRow][nextCol].value !== '.' && !pipeMap[nextRow][nextCol].visited) {
        return {row: nextRow, col: nextCol, value: pipeMap[nextRow][nextCol].value, visited: false};
      }
    }

    return null;
  }

  function getStepsFromStartingPoint(startingPoint, pipeMap) {
    let steps = [];
    let currentPoint = startingPoint;

    while (currentPoint) {
      steps.push(currentPoint);
      pipeMap[currentPoint.row][currentPoint.col].visited = true;
      currentPoint = getNextPoint(currentPoint, pipeMap);
    }

    return steps;
  }
  
  const main = () => {
    let data = getData();
    let pipeMap = getPipeMap(data);
    let startingPoint = getStartingPoint(pipeMap);
    let paths = [];

    TILES_VALUES.forEach(tile => {
      startingPoint.value = tile;
      let path = getStepsFromStartingPoint(startingPoint, pipeMap);
      paths.push(path);
    });
    
    let steps = paths.reduce((prev, curr) => {
      return prev.length > curr.length ? prev : curr;
    });

    console.log(`The number of steps to the farthest point is ${steps.length / 2}`);
  };
  
  main();
};

