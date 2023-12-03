const fs = require('fs');
const path = require('path');

module.exports = function () {

  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function isASymbol (char) {
    const reg = /[^a-zA-Z\.0-9]/g;
    return reg.test(char);
  }

  function isANumber (char) {
    const reg = /[0-9]/g;
    return reg.test(char);
  }

  function checkIfQualifiesForPartNumber(schematic, x, y) {
    const offsites = [-1, 0, 1];
    let symbolsFound = [];
    for (let verticalOffsite of offsites) {
      for (let horizontalOffsite of offsites) {
        if(y+verticalOffsite >= 0 && y+verticalOffsite < schematic.length && x+horizontalOffsite >= 0 && x+horizontalOffsite < schematic[y+verticalOffsite].length) {
          if(isASymbol(schematic[x+horizontalOffsite][y+verticalOffsite])) {
            return { value: schematic[x+horizontalOffsite][y+verticalOffsite], x: x+horizontalOffsite, y: y+verticalOffsite };
          }
        }
      }
    }
    return null;
  }

  function getPartNumbers(schematic) {
    let partNumbers = new Set();
    let gears = [];
    let qualifiesForPartNumber = false;
    let numberDetected = false;
    let number = 0;

    for (let i = 0; i < schematic.length; i++) {
      const line = schematic[i];
      const offistes = [-1, 0, 1];

      for(let j = 0; j < line.length; j++) {
        if(isANumber(schematic[i][j])) {
          numberDetected = true;
          number = number * 10 + parseInt(schematic[i][j]);
          // if the number was not qualified for a part number, check if it qualifies now
          if(!qualifiesForPartNumber) {
            qualifiesForPartNumber = checkIfQualifiesForPartNumber(schematic, i, j);
          }
          if(j === line.length - 1) {
            // if we are at the end of the line, we add the number to the part numbers
            partNumbers.add({
              number,
              qualifiesForPartNumber,
            });
            // Reset conditions
            numberDetected = false;
            qualifiesForPartNumber = false;
            number = 0;
          }
        } else {
          if(numberDetected) {
            // we had a number detected before and now we have a symbol
            partNumbers.add({
              number,
              gearValue: qualifiesForPartNumber ? qualifiesForPartNumber.value : null,
              position: qualifiesForPartNumber ? [qualifiesForPartNumber.x, qualifiesForPartNumber.y].join('-') : null,
            });

            // Reset conditions
            numberDetected = false;
            qualifiesForPartNumber = false;
            number = 0;
          }
        }
      }
    }

    return [...partNumbers];
  }

  function groupGearsByPosition(gears) {
    let groupedGears = gears.reduce((acc, gear) => {
      if(acc[gear.position]) {
        acc[gear.position].push(gear.number);
      } else {
        acc[gear.position] = [gear.number];
      }
      return acc;
    }, new Map());

    return groupedGears;
  }

  const main = () => {
    let lines = getData();
    let shematic = lines.map((line) => line.split(''));
  
    const partNumbers = getPartNumbers(shematic);
    let gears = partNumbers.filter((partNumber) => partNumber.gearValue === '*');

    let groupedGears = groupGearsByPosition(gears);

    let gearRatios = 0;
    for (const key in groupedGears) {
      if (Object.hasOwnProperty.call(groupedGears, key)) {
        const element = groupedGears[key];
        if(element.length > 1) {
          gearRatios += element.reduce((a, b) => a * b, 1);
        }
      }
    }

    console.log(`The sum of all the gears ratio is ${gearRatios}`)

  };
  
  main();
};

