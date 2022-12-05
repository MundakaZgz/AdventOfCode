const fs = require('fs');
const internal = require('stream');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  elves = [0]
  elfNumber = 0
  data.split(/\r?\n/).forEach(line =>  {
    if(line == '') {
        elfNumber++;
        elves[elfNumber] = 0
    } else {
        elves[elfNumber] += parseInt(line)
    }
  });

  const maxCalories = Math.max(...elves);
  const numberOfElfWithMaxCalories = elves.indexOf(maxCalories) + 1

  console.log(`The elf with the most number of calories is elf number ${numberOfElfWithMaxCalories} with ${maxCalories} calories`)

});