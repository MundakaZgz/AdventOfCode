const fs = require('fs');
const path = require('path');

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
  
  function pipeComesFromNorth (pipeMap, row, col) {
    if (row === 0) {
      return false;
    }
    return ['|','7','F'].includes(pipeMap[row-1][col].value);
  }
  
  function pipeComesFromSouth (pipeMap, row, col) {
    if (row === pipeMap.length-1) {
      return false;
    }
    return ['L','J','|'].includes(pipeMap[row+1][col].value);
  }
  
  function pipeComesFromEast (pipeMap, row, col) {
    if (col === pipeMap[row].length-1) {
      return false;
    }
    return ['7','-','J'].includes(pipeMap[row][col+1].value);
  }
  
  function pipeComesFromWest (pipeMap, row, col) {
    if (col === 0) {
      return false;
    }
    return ['L','-','F'].includes(pipeMap[row][col-1].value);
  }
  
  function getStartingPointValue (pipeMap, row, col) {
    if(pipeComesFromNorth(pipeMap, row, col)) {
      if(pipeComesFromEast(pipeMap, row, col)) {
        return 'L';
      }
      if(pipeComesFromSouth(pipeMap, row, col)) {
        return '|';
      }
      if(pipeComesFromWest(pipeMap, row, col)) {
        return 'J';
      }
    }
    if(pipeComesFromEast(pipeMap, row, col)) {
      if(pipeComesFromSouth(pipeMap, row, col)) {
        return 'F';
      }
      if(pipeComesFromWest(pipeMap, row, col)) {
        return '-';
      }
    }
    if(pipeComesFromSouth(pipeMap, row, col)) {
      if(pipeComesFromWest(pipeMap, row, col)) {
        return '7';
      }
    }
  }
  
  function getStartingPoint(pipeMap) {
    for(let row=0; row<pipeMap.length; row++) {
      for(let col=0; col<pipeMap[row].length; col++) {
        if (pipeMap[row][col].value === 'S') {
          pipeMap[row][col].value = getStartingPointValue(pipeMap,row,col);
          return {row, col, value: pipeMap[row][col].value, visited: true};
        }
      }
    }
  }
  
  const NORTH = {vertical: -1, horizontal: 0};
  const SOUTH = {vertical: 1, horizontal: 0};
  const EAST = {vertical: 0, horizontal: 1};
  const WEST = {vertical: 0, horizontal: -1};
  
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
      currentPoint.visited = true;
      steps.push(currentPoint);
      pipeMap[currentPoint.row][currentPoint.col].visited = true;
      currentPoint = getNextPoint(currentPoint, pipeMap);
    }
    
    return steps;
  }

  function getCleanMap(pipeMap, path) {
    let cleanMap = Array(pipeMap.length).fill().map(() => 
    Array(pipeMap[0].length).fill('.'));
  
    for(let step=0; step<path.length; step++) {
      cleanMap[path[step].row][path[step].col] = path[step].value;
    }
  
    return cleanMap;
  }

  function countEnclosedTiles(cleanMap) {
    let enclosedTiles = 0;
    let isInternal = false;
    let lastCorner = '';

    for(let row=0; row<cleanMap.length; row++) {
      for(let col=0; col<cleanMap[row].length; col++) {
        switch (cleanMap[row][col]) {
          case '.':
            if(isInternal) enclosedTiles++;
            break;
          case '|':
            isInternal = ! isInternal;   
            break; 
          case 'L':
            lastCorner = 'L';
            break;
          case 'F':
            lastCorner = 'F';
            break;
          case 'J':
              if(lastCorner === 'F') isInternal = ! isInternal;
              break;
          case '7':
            if(lastCorner === 'L') isInternal = ! isInternal;
            break;
        }
      }
    }
  
    return enclosedTiles;
  }

  const main = () => {
    let data = getData();
    let pipeMap = getPipeMap(data);
    let startingPoint = getStartingPoint(pipeMap);
    let path = getStepsFromStartingPoint(startingPoint, pipeMap);
    let cleanMap = getCleanMap(pipeMap, path);
    let enclosedTiles = countEnclosedTiles(cleanMap);
  
    console.log(`There are ${enclosedTiles} within the loop`);
  };
  
  main();
};

