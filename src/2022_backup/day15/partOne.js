const fs = require("fs");
const path = require("path");

const DATA_STRUCTURE =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

function getData() {
  const textFilePath = path.join(__dirname, "test_input.txt");
  const data = fs.readFileSync(textFilePath, "utf-8").split("\n");
  return data;
}

function getSensorsAndBeacons() {
  const data = getData();
  const sensorsAndBeacons = data.map((line) => {
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

function getManhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getOccupiedPositionsInLine(sensorsAndBeacons, line, minX, maxX) {
  const occupiedPositions = [];
  occupiedPositions.fill(false, minX, maxX);

  sensorsAndBeacons.forEach((sensorAndBeacon) => {
    if (
      (sensorAndBeacon.sensorY <= line && sensorAndBeacon.beaconY >= line) ||
      (sensorAndBeacon.sensorY >= line && sensorAndBeacon.beaconY <= line)
    ) {
      console.log(
        `Line from ${sensorAndBeacon.sensorY} to ${sensorAndBeacon.beaconY} crosses line ${line}`,
      );

      const distanceBetweenSensorAndBeacon = getManhattanDistance(
        sensorAndBeacon.sensorX,
        sensorAndBeacon.sensorY,
        sensorAndBeacon.beaconX,
        sensorAndBeacon.beaconY,
      );
      console.log(
        `Distance between sensor and beacon: ${distanceBetweenSensorAndBeacon}`,
      );
      for (let i = 0; i < maxX - minX; i++) {
        console.log(
          `Distance to sensor: ${getManhattanDistance(sensorAndBeacon.sensorX, sensorAndBeacon.sensorY, minX + i, line)}`,
        );
        if (
          getManhattanDistance(
            sensorAndBeacon.sensorX,
            sensorAndBeacon.sensorY,
            minX + i,
            line,
          ) <= distanceBetweenSensorAndBeacon
        ) {
          occupiedPositions[i] = true;
        }
      }
    }
  });

  return occupiedPositions;
}

function getMinAndMaxX(sensorsAndBeacons) {
  const minXSensor = Math.min(
    ...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.sensorX),
  );
  const minXBeacon = Math.min(
    ...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.beaconX),
  );
  const minX = Math.min(minXSensor, minXBeacon);
  const maxXSensor = Math.max(
    ...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.sensorX),
  );
  const maxXBeacon = Math.max(
    ...sensorsAndBeacons.map((sensorAndBeacon) => sensorAndBeacon.beaconX),
  );
  const maxX = Math.max(maxXSensor, maxXBeacon);
  return {
    minX,
    maxX,
  };
}

function main() {
  const sensorsAndBeacons = getSensorsAndBeacons();
  const line = 10;
  const { minX, maxX } = getMinAndMaxX(sensorsAndBeacons);
  const linePositions = getOccupiedPositionsInLine(
    sensorsAndBeacons,
    line,
    minX,
    maxX,
  );
  const solution = linePositions.filter((position) => {
    position = true;
  }).length;

  console.log(
    `There are ${solution} positions that cannot contain beacons in line ${line}`,
  );
}

module.exports = {
  main,
};
