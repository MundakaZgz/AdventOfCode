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

  function getInitialMapFromData(data) {
    const coordinatesList = data.map((walkpath) => walkpath
      .split('->')
      .map((step) => {
        const [x, y] = step.trim().split(',').map((coord) => parseInt(coord, 10));
        return { x, y };
      })).flat();

    const maxDepth = Math.max(...coordinatesList.map((o) => o.y));
    const maxWidth = Math.max(...coordinatesList.map((o) => o.x));

    return Array(maxDepth).fill(Array(maxWidth).fill('.'));
  }

  function markMapFromTo(map, from, to) {
    const yBegin = Math.min(from.x, to.x);
    const yEnd = Math.max(from.x, to.x);
    const xBegin = Math.min(from.y, to.y);
    const xEnd = Math.max(from.y, to.y);

    for (let x = xBegin; x < xEnd; x++) {
      for (let y = yBegin; y < yEnd; y++) {
        map[x][y] = '#';
      }
    }
  }

  drawPathsFromData = (map, data) => {
    for (const path of data) {
      const points = path.split('->')
        .map((step) => step.trim()).map((step) => {
          [x, y] = step.split('');
          return { x, y };
        });

      for (let i = 0; i < points.length - 1; i++) {
        markMapFromTo(map, points[i], points[i + 1]);
      }
    }
  }

  function getInput() {
    const data = getData();
    const map = getInitialMapFromData(data);
    drawPathsFromData(map, data);
    return map;
  }

  isEmpty = (map, coordinates) => {
    return map[coordinates.y][coordinates.x] === '.';
  }

  sandCanGoDown = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x, y: sandUnitCoordinates.y + 1 };
    if (nextCoordinate.y >= map.length) {
      return false;
    }
    return isEmpty(map, nextCoordinate);
  }

  sandCanGoDownLeft = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x - 1, y: sandUnitCoordinates.y + 1 };
    if (nextCoordinate.y >= map.length || nextCoordinate.x < 0) {
      return false;
    }
    return isEmpty(map, nextCoordinate);
  }

  sandCanGoDownRight = (map, sandUnitCoordinates) => {
    const nextCoordinate = { x: sandUnitCoordinates.x + 1, y: sandUnitCoordinates.y + 1 };
    if (nextCoordinate.y >= map.length || nextCoordinate.x > map[nextCoordinate.y].length - 1) {
      return false;
    }
    return isEmpty(map, nextCoordinate);
  }

  isSandUnitAtInitialCoordinates = (sandUnitCoordinates, initialCoordinates) => {
    return sandUnitCoordinates.x === initialCoordinates.x && sandUnitCoordinates.y === initialCoordinates.y;
  }
  
  dropSandUnit = (map, initialCoordinates) => {
    let sandUnitCoordinates = initialCoordinates;
    while (true) {
      if (sandCanGoDown(map, sandUnitCoordinates)) {
        sandUnitCoordinates = { x: sandUnitCoordinates.x, y: sandUnitCoordinates.y + 1 };
        couldDropSand = true;
      } else if (sandCanGoDownLeft(map, sandUnitCoordinates)) {
        sandUnitCoordinates = { x: sandUnitCoordinates.x - 1, y: sandUnitCoordinates.y + 1 };
        couldDropSand = true;
      } else if (sandCanGoDownRight(map, sandUnitCoordinates)) {
        sandUnitCoordinates = { x: sandUnitCoordinates.x + 1, y: sandUnitCoordinates.y + 1 };
        couldDropSand = true;
      } else {
        map[sandUnitCoordinates.y][sandUnitCoordinates.x] = 'o';
        return !isSandUnitAtInitialCoordinates(sandUnitCoordinates, initialCoordinates);
      }
    }
  }

  dropAsManySandUnitsAsPossible = (map, initialCoordinates) => {
    let couldDropSand = true;
    let sandUnits = 0;
    while (couldDropSand) {
      couldDropSand = dropSandUnit(map, initialCoordinates);
      sandUnits++;
    }
    return sandUnits;
  }

  function main() {
    let map = getInput();
    let sandUnits = dropAsManySandUnitsAsPossible(map, INITIAL_SAND_COORDINATES);
    console.log(`${sandUnits} sand units could be dropped`);
  }

module.exports = {
  sandCanGoDown,
  sandCanGoDownLeft,
  sandCanGoDownRight,
  isEmpty,
  isSandUnitAtInitialCoordinates,
  dropAsManySandUnitsAsPossible,
  main,
};
