const fs = require('fs');
const path = require('path');

const INITIAL_SAND_COORDINATES = { x: 500, y: 0 };

function getData() {
  const textFilePath = path.join(__dirname, 'input.txt');
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

  for (let x = xBegin; x <= xEnd; x++) {
    for (let y = yBegin; y <= yEnd; y++) {
      map.add(`${y},${x}`);
    }
  }

  return map;
}

const extractListOfPointsFromSegment = (segment) => {
  const points = [];
  const regex = /(\d+),(\d+)/g;
  let match;
  while ((match = regex.exec(segment)) !== null) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    points.push({ x, y });
  }
  return points;
};

const drawPathsFromData = (data) => {
  let maxDepth = 0;
  const map = new Set();

  for (const segment of data) {
    const points = extractListOfPointsFromSegment(segment);
    for (let i = 0; i < points.length - 1; i++) {
      markMapFromTo(map, points[i], points[i + 1]);
      maxDepth = Math.max(maxDepth, points[i].y, points[i + 1].y);
    }
  }
  return { map, maxDepth };
};

function drawMap(map, maxDepth) {
  let mapString = '';
  for (let y = 0; y <= maxDepth; y++) {
    for (let x = 494; x < 505; x++) {
      if (map.has(`${x},${y}`)) {
        mapString += '#';
      } else {
        mapString += '.';
      }
    }
    mapString += '\n';
  }
  console.log(mapString);
}

function getInput() {
  const data = getData();
  return drawPathsFromData(data);
}

const isEmpty = (map, coordinates) => !map.has(`${coordinates.x},${coordinates.y}`);

const sandCanGoDown = (map, sandUnitCoordinates) => {
  const nextCoordinate = { x: sandUnitCoordinates.x, y: sandUnitCoordinates.y + 1 };
  return isEmpty(map, nextCoordinate);
};

const sandCanGoDownLeft = (map, sandUnitCoordinates) => {
  const nextCoordinate = { x: sandUnitCoordinates.x - 1, y: sandUnitCoordinates.y + 1 };
  return isEmpty(map, nextCoordinate);
};

const sandCanGoDownRight = (map, sandUnitCoordinates) => {
  const nextCoordinate = { x: sandUnitCoordinates.x + 1, y: sandUnitCoordinates.y + 1 };
  return isEmpty(map, nextCoordinate);
};

const dropAsManySandUnitsAsPossible = (map, initialCoordinates, maxDepth) => {
  let sandUnits = 0;
  let fallingIntoTheEndlessVoid = false;

  while (!fallingIntoTheEndlessVoid) {
    const sandUnitCoordinates = { ...initialCoordinates };
    let sandCanGoFurther = true;
    sandUnits++;

    while (sandCanGoFurther) {
      if (sandCanGoDown(map, sandUnitCoordinates)) {
        sandUnitCoordinates.y++;
      } else if (sandCanGoDownLeft(map, sandUnitCoordinates)) {
        sandUnitCoordinates.x--;
        sandUnitCoordinates.y++;
      } else if (sandCanGoDownRight(map, sandUnitCoordinates)) {
        sandUnitCoordinates.x++;
        sandUnitCoordinates.y++;
      } else {
        map.add(`${sandUnitCoordinates.x},${sandUnitCoordinates.y}`);
        sandCanGoFurther = false;
      }
      if (sandUnitCoordinates.y >= maxDepth) {
        fallingIntoTheEndlessVoid = true;
        sandCanGoFurther = false;
        sandUnits--;
      }
    }
  }

  return sandUnits;
};

function main() {
  const { map, maxDepth } = getInput();
  const sandUnits = dropAsManySandUnitsAsPossible(map, INITIAL_SAND_COORDINATES, maxDepth);
  // drawMap(map, maxDepth);
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
