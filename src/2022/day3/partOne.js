const fs = require('fs');
const path = require('path');

module.exports = function () {
  const textFilePath = path.join(__dirname, 'input.txt');

  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    priorities = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    sumOfPriorities = 0;

    data.split(/\r?\n/).forEach((rucksack) => {
      compartment1 = rucksack.slice(0, rucksack.length / 2);
      compartment2 = rucksack.slice(-rucksack.length / 2);
      foundLetter = '';
      compartment1.split('').forEach((letter) => {
        if (compartment2.indexOf(letter) != -1) {
          foundLetter = letter;
        }
      });
      sumOfPriorities += priorities.indexOf(foundLetter);
    });

    console.log(`The sum of priorities is ${sumOfPriorities}`);
  });
};
