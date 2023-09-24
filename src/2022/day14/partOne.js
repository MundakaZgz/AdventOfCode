const fs = require('fs');
const path = require('path');

const INITIAL_SAND_COORDINATES = { x: 500, y: 0 };

  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs
      .readFileSync(textFilePath, 'utf-8')
      .split('\n');
    return data;
  }

  function markMapFromTo(map, from, to) {
    const yBegin = Math.min(from.x, to.x);
    const yEnd = Math.max(from.x, to.x);
    const xBegin = Math.min(from.y, to.y);
    const xEnd = Math.max(from.y, to.y);

    for (let x = xBegin; x < xEnd; x++) {
      for (let y = yBegin; y < yEnd; y++) {
        map.add(`${x},${y}`);
      }
    }

    return map;
  }

  drawPathsFromData = (data) => {
    let maxDepth = 0;
    let map = new Set();
    for (const path of data) {
      const points = path.split('->')
        .map((step) => step.trim()).map((step) => {
          [x, y] = step.split('');
          maxDepth = Math.max(maxDepth, y);
          return { x, y };
        });

      for (let i = 0; i < points.length - 1; i++) {
        map = markMapFromTo(map, points[i], points[i + 1]);
      }
    }

    maxDepth--;
    return {map, maxDepth};
  }

  function getInput() {
    const data = getData();
    return { map, maxDepth } = drawPathsFromData(data);
  }

  isEmpty = (map, coordinates) => {
    return !map.has(`${coordinates.x},${coordinates.y}`);
  }

  sandCanGoDown = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x, y: sandUnitCoordinates.y + 1 };
    return isEmpty(map, nextCoordinate);
  }

  sandCanGoDownLeft = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x - 1, y: sandUnitCoordinates.y + 1 };
    return isEmpty(map, nextCoordinate);
  }

  sandCanGoDownRight = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x + 1, y: sandUnitCoordinates.y + 1 };
    return isEmpty(map, nextCoordinate);
  }

  dropAsManySandUnitsAsPossible = (map, initialCoordinates, maxDepth) => {
    let sandUnits = 0;
    let fallingIntoTheEndlessVoid = false;

    while (!fallingIntoTheEndlessVoid) {
      let sandUnitCoordinates = initialCoordinates;
      sandUnits++;

      while (!fallingIntoTheEndlessVoid) {
        if (sandCanGoDown(map, sandUnitCoordinates)) {
          console.log('sand can go down')
          sandUnitCoordinates.y++;
        } else if (sandCanGoDownLeft(map, sandUnitCoordinates)) {
          console.log('sand can go down left')
          sandUnitCoordinates.x--;
          sandUnitCoordinates.y++;
        } else if (sandCanGoDownRight(map, sandUnitCoordinates)) {
          console.log('sand can go down right')
          sandUnitCoordinates.x++;
          sandUnitCoordinates.y++;
        } else {
          map.add(`${sandUnitCoordinates.x},${sandUnitCoordinates.y}`);
          break;
        }
        if(sandUnitCoordinates.y >= maxDepth) {
          fallingIntoTheEndlessVoid = true;
          sandUnits--;
        }
      }
    }
    
    console.log(`sandUnits: ${sandUnits}`);

    return sandUnits;
  }

 function main() {
    let { map, maxDepth } = getInput();
    let sandUnits = dropAsManySandUnitsAsPossible(map, INITIAL_SAND_COORDINATES, maxDepth);
    console.log(`${sandUnits} sand units could be dropped`);
  }

module.exports = {
  sandCanGoDown,
  sandCanGoDownLeft,
  sandCanGoDownRight,
  isEmpty,
  dropAsManySandUnitsAsPossible,
  main,
};
