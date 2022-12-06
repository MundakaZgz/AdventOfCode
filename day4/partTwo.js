const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  numAssignmentsFullyContained = 0

  data.split(/\r?\n/).forEach(pair => {
    let [assignment1,assignment2] = pair.split(',',2)
    let [lower1,upper1] = assignment1.split('-',2).map(Number)
    let [lower2,upper2] = assignment2.split('-',2).map(Number)

    if(lower1 <= upper2 && upper1 >= lower2) {
      numAssignmentsFullyContained++;
    }

  });
  
  console.log(`There are ${numAssignmentsFullyContained} assignments that overlap`)
});