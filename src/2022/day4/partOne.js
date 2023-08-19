const fs = require('fs');

const path = require('path');

module.exports = function () {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    numAssignmentsFullyContained = 0;

    data.split(/\r?\n/).forEach((pair) => {
      const [assignment1, assignment2] = pair.split(',', 2);
      const [lower1, upper1] = assignment1.split('-', 2).map(Number);
      const [lower2, upper2] = assignment2.split('-', 2).map(Number);

      if ((lower1 >= lower2 && upper1 <= upper2) || (lower2 >= lower1 && upper2 <= upper1)) {
        numAssignmentsFullyContained++;
      }
    });

    console.log(`There are ${numAssignmentsFullyContained} assignments that overlap`);
  });
};
