const fs = require('fs');
const path = require('path');

module.exports = () => {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const elves = [0];
    let elfNumber = 0;
    data.split(/\r?\n/).forEach((line) => {
      if (line === '') {
        elfNumber++;
        elves[elfNumber] = 0;
      } else {
        elves[elfNumber] += parseInt(line, 10);
      }
    });

    const maxCalories = Math.max(...elves);
    const numberOfElfWithMaxCalories = elves.indexOf(maxCalories) + 1;

    console.log(`The elf with the most number of calories is elf number ${numberOfElfWithMaxCalories} with ${maxCalories} calories`);
  });
};
