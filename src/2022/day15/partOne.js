const fs = require('fs');
const path = require('path');

const DATA_STRUCTURE = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

function getData() {
  const textFilePath = path.join(__dirname, 'test_input.txt');
  const data = fs
    .readFileSync(textFilePath, 'utf-8')
    .split('\n');
  return data;
}

function getSensorsAndBeacons() {
  let sensorsAndBeacons = [];

  const data = getData();
  sensorsAndBeacons = data.map((line) => {
    const match = line.match(DATA_STRUCTURE);
    if (match) {
      const sensorX = parseInt(match.groups.sensorX, 10);
      const sensorY = parseInt(match.groups.sensorY, 10);
      const beaconX = parseInt(match.groups.beaconX, 10);
      const beaconY = parseInt(match.groups.beaconY, 10);
      return {
        sensorX,
        sensorY,
        beaconX,
        beaconY,
      };
    }
    return null;
  });

  return sensorsAndBeacons;
}

function positionsOccupiedInLine(sensorsAndBeacons, line, maxPosition, minPosition) {
  let positionsOccupied = 0;
  for (let i = minPosition; i <= maxPosition; i++) {
    let isOccupied = false;
    for (let j = 0; j < sensorsAndBeacons.length; j++) {
      let sensorAndBeacon = sensorsAndBeacons[j];
      let sensorX = sensorAndBeacon.sensorX;
      let sensorY = sensorAndBeacon.sensorY;
      let beaconX = sensorAndBeacon.beaconX;
      let beaconY = sensorAndBeacon.beaconY;
      let isSensorInLine = (sensorX === line || sensorY === line);
      let isBeaconInLine = (beaconX === line || beaconY === line);
      if (isSensorInLine || isBeaconInLine) {
        if (i >= Math.min(sensorX, beaconX) && i <= Math.max(sensorX, beaconX)) {
          isOccupied = true;
          break;
        }
      }
    }
    if (isOccupied) {
      positionsOccupied++;
    }
  }
  return positionsOccupied;
}

function main() {
  let sensorsAndBeacons = getSensorsAndBeacons();
  let line = 10;
  let minXSensor = Math.min(...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.sensorX));
  let minXBeacon = Math.min(...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.beaconX));
  let minX = Math.min(minXSensor, minXBeacon);
  let maxXSensor = Math.max(...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.sensorX));
  let maxXBeacon = Math.max(...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.beaconX));
  let maxX = Math.max(maxXSensor, maxXBeacon);
  console.log(`There are ${maxX - minX} positions in line ${line}`);
  let positionsOccupied = positionsOccupiedInLine(sensorsAndBeacons, line, minX, maxX);

  let solution = maxX - minX + 1 - positionsOccupied;
  console.log(`There are ${solution} positions that cannot contain beacons in line ${line}`);
}

module.exports = {
  main,
}