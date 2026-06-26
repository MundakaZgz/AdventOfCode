const fs = require("fs");
const path = require("path");

module.exports = function () {
  const EXPANSION_FACTOR = 1_000_000;

  function getData() {
    const textFilePath = path.join(__dirname, "input.txt");
    const data = fs.readFileSync(textFilePath, "utf8").split(/\r?\n/);
    return data;
  }

  function getUniverse(data) {
    const universe = [];
    for (let row = 0; row < data.length; row++) {
      universe.push(data[row].split(""));
    }
    return universe;
  }

  function expandUniverse(universe) {
    const emtpyRows = [];
    for (let row = 0; row < universe.length; row++) {
      if (universe[row].every((element) => element === ".")) {
        emtpyRows.push(row);
      }
    }
    const emptyColumns = [];
    for (let column = 0; column < universe[0].length; column++) {
      const columnArray = universe.map((row) => row[column]);
      if (columnArray.every((element) => element === ".")) {
        emptyColumns.push(column);
      }
    }

    return {
      emptyRows: emtpyRows,
      emptyColumns,
    };
  }

  function findGalaxies(universe) {
    const galaxies = [];
    let galaxyId = 1;
    for (let row = 0; row < universe.length; row++) {
      for (let column = 0; column < universe[0].length; column++) {
        if (universe[row][column] === "#") {
          galaxies.push({
            id: galaxyId,
            row,
            column,
          });
          universe[row][column] = galaxyId;
          galaxyId++;
        }
      }
    }

    return galaxies;
  }

  function pairGalaxies(galaxies) {
    const pairedGalaxies = {};

    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        if (galaxies[i].id === galaxies[j].id) continue;
        const pairId =
          galaxies[i].id < galaxies[j].id
            ? `${galaxies[i].id}-${galaxies[j].id}`
            : `${galaxies[j].id}-${galaxies[i].id}`;
        pairedGalaxies[pairId] = {
          galaxy1: galaxies[i],
          galaxy2: galaxies[j],
        };
      }
    }

    return pairedGalaxies;
  }

  function getDistance(galaxy1, galaxy2, expansionAreas) {
    const startRow = Math.min(galaxy1.row, galaxy2.row);
    const endRow = Math.max(galaxy1.row, galaxy2.row);
    const startColumn = Math.min(galaxy1.column, galaxy2.column);
    const endColumn = Math.max(galaxy1.column, galaxy2.column);

    let distance =
      Math.abs(galaxy1.row - galaxy2.row) +
      Math.abs(galaxy1.column - galaxy2.column);

    for (let row = startRow; row <= endRow; row++) {
      if (expansionAreas.emptyRows.includes(row)) {
        distance += EXPANSION_FACTOR - 1;
      }
    }

    for (let column = startColumn; column <= endColumn; column++) {
      if (expansionAreas.emptyColumns.includes(column)) {
        distance += EXPANSION_FACTOR - 1;
      }
    }

    return distance;
  }

  const main = () => {
    const data = getData();
    const universe = getUniverse(data);
    const expansionAreas = expandUniverse(universe);
    const galaxies = findGalaxies(universe);
    const pairedGalaxies = pairGalaxies(galaxies);

    const distances = Object.values(pairedGalaxies).map((pair) =>
      getDistance(pair.galaxy1, pair.galaxy2, expansionAreas),
    );

    console.log(
      `The sum of all distances is ${distances.reduce((a, b) => a + b)}`,
    );
  };

  main();
};
