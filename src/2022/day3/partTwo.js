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

    lines = data.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 3) {
      firstRucksack = lines[i].split('');
      secondRucksack = lines[i + 1].split('');
      thirdRucksack = lines[i + 2].split('');

      foundLetter = '';

      firstRucksack.forEach((letter) => {
        if (secondRucksack.indexOf(letter) != -1 && thirdRucksack.indexOf(letter) != -1) {
          foundLetter = letter;
        }
      });

      sumOfPriorities += priorities.indexOf(foundLetter);
    }

    console.log(`The sum of priorities is ${sumOfPriorities}`);
  });
};
