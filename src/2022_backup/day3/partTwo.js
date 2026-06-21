const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function main() {
    const priorities = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let sumOfPriorities = 0;

    const lines = getData();

    for (let i = 0; i < lines.length; i += 3) {
      const firstRucksack = lines[i].split('');
      const secondRucksack = lines[i + 1].split('');
      const thirdRucksack = lines[i + 2].split('');

      let foundLetter = '';

      firstRucksack.forEach((letter) => {
        if (secondRucksack.indexOf(letter) !== -1 && thirdRucksack.indexOf(letter) !== -1) {
          foundLetter = letter;
        }
      });

      sumOfPriorities += priorities.indexOf(foundLetter);
    }

    console.log(`The sum of priorities is ${sumOfPriorities}`);
  }

  main();
};
