const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  elves = [0]
  elfNumber = 0
  data.split(/\r?\n/).forEach(line => {
    if(line == '') {
        elfNumber++;
        elves[elfNumber] = 0
    } else {
        elves[elfNumber] += parseInt(line)
    }
  });

  const topThreeElves = elves.sort((a, b) => b - a).slice(0,3)
  const topThreeCaloriesSum = topThreeElves.reduce((acc,curr) => { return acc + curr });

  console.log(`The sum of the calories of the top 3 elves ${topThreeElves} is ${topThreeCaloriesSum}`)
  console.log(Math.max(...elves))

});