const fs = require('fs');
const path = require('path');

module.exports = function () {

  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  const main = () => {
    const elves = [0];
    let elfNumber = 0;
    
    const data = getData();
    
    for (const line of data) {
      if (line === '') {
        elfNumber++;
        elves[elfNumber] = 0;
      } else {
        elves[elfNumber] += parseInt(line, 10);
      }
    }
    
    const maxCalories = Math.max(...elves);
    const numberOfElfWithMaxCalories = elves.indexOf(maxCalories) + 1;
    
    console.log(`The elf with the most number of calories is elf number ${numberOfElfWithMaxCalories} with ${maxCalories} calories`);
  };
  
  main();
};

