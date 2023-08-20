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
    const topThreeElves = elves.sort((a, b) => b - a).slice(0, 3);
    const topThreeCaloriesSum = topThreeElves.reduce((acc, curr) => acc + curr);
    
    console.log(`The sum of the calories of the top 3 elves ${topThreeElves} is ${topThreeCaloriesSum} and the maximum is ${Math.max(...elves)}`);
  };
  
  main();
};
