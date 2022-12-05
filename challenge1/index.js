const fs = require('fs');
const internal = require('stream');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  elfs = [0]
  elfNumber = 0
  data.split(/\r?\n/).forEach(line =>  {
    if(line == '') {
        elfNumber++;
        elfs[elfNumber] = 0
    } else {
        elfs[elfNumber] += parseInt(line)
    }
  });

  const maxCalories = Math.max(...elfs);
  const numberOfElfWithMaxCalories = elfs.indexOf(maxCalories) + 1

  console.log(`The elf with the most number of calories is elf number ${numberOfElfWithMaxCalories} with ${maxCalories} calories`)

});