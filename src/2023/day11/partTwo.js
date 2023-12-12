const fs = require('fs');
const path = require('path');

module.exports = function () {

  const EXPANSION_FACTOR = 1_000_000;
  
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getUniverse(data) {
    let universe = [];
    for(let row=0; row<data.length; row++) {
      universe.push(data[row].split(''));
    }
    return universe;
  }
  
  function expandUniverse(universe) {
    let emtpyRows = [];
    for(let row=0; row<universe.length; row++) {
      if(universe[row].every(element => element === '.')) {
        emtpyRows.push(row);
      }
    }
    let emptyColumns = [];
    for(let column=0; column<universe[0].length; column++) {
      let columnArray = universe.map(row => row[column]);
      if(columnArray.every(element => element === '.')) {
        emptyColumns.push(column);
      }
    }
  
    return {
      emptyRows: emtpyRows,
      emptyColumns: emptyColumns
    };
  }

  function findGalaxies(universe) {
    let galaxies = [];
    let galaxyId = 1;
    for(let row=0; row<universe.length; row++) {
      for(let column=0; column<universe[0].length; column++) {
        if(universe[row][column] === '#') {
          galaxies.push({
            id: galaxyId,
            row: row,
            column: column
          });
          universe[row][column] = galaxyId;
          galaxyId++;
        }
      }
    }

    return galaxies;
  }

  function pairGalaxies(galaxies) {
    let pairedGalaxies = {};

    for(let i=0; i<galaxies.length; i++) {
      for(let j=i+1; j<galaxies.length; j++) {
        if(galaxies[i].id === galaxies[j].id) continue;
        let pairId = galaxies[i].id < galaxies[j].id ? `${galaxies[i].id}-${galaxies[j].id}` : `${galaxies[j].id}-${galaxies[i].id}`;
        pairedGalaxies[pairId] = {
          galaxy1: galaxies[i],
          galaxy2: galaxies[j]
        };
      }
    }

    return pairedGalaxies;
  }


  function getDistance(galaxy1, galaxy2, expansionAreas) {
    let startRow = Math.min(galaxy1.row, galaxy2.row);
    let endRow = Math.max(galaxy1.row, galaxy2.row);
    let startColumn = Math.min(galaxy1.column, galaxy2.column);
    let endColumn = Math.max(galaxy1.column, galaxy2.column);

    let distance = Math.abs(galaxy1.row - galaxy2.row) + Math.abs(galaxy1.column - galaxy2.column);

    for(let row=startRow; row<=endRow; row++) {
      if(expansionAreas.emptyRows.includes(row)) {
        distance += EXPANSION_FACTOR - 1;
      }
    }

    for(let column=startColumn; column<=endColumn; column++) {
      if(expansionAreas.emptyColumns.includes(column)) {
        distance += EXPANSION_FACTOR - 1;
      } 
    }

    return distance
  }

  const main = () => {
    let data = getData();
    let universe = getUniverse(data);
    let expansionAreas = expandUniverse(universe);
    let galaxies = findGalaxies(universe);
    let pairedGalaxies = pairGalaxies(galaxies);

   let distances = Object.values(pairedGalaxies).map(pair => getDistance(pair.galaxy1,pair.galaxy2, expansionAreas));

    console.log(`The sum of all distances is ${distances.reduce((a,b) => a+b)}`);

  };
  
  main();
};

