const fs = require("fs");
const path = require("path");

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, "input.txt");
    const data = fs.readFileSync(textFilePath, "utf8").split(/\r?\n/);
    return data;
  }

  function getCardNumbers(line) {
    const cleanLine = line
      .replaceAll(/\s+/g, " ")
      .replaceAll(/Card \d+: /g, "");
    const numberGroups = cleanLine
      .split("|")
      .map((group) => group.trim().split(" "));
    return {
      myNumbers: numberGroups[0],
      winningNumbers: numberGroups[1],
    };
  }

  const getScore = (cards) => {
    let hits = 0;

    cards.myNumbers.forEach((number) => {
      if (cards.winningNumbers.includes(number)) {
        hits === 0 ? hits++ : (hits *= 2);
      }
    });

    return hits;
  };

  const main = () => {
    const lines = getData();
    const cards = lines.map(getCardNumbers);
    const scores = cards.map(getScore);
    console.log(`The number of points is ${scores.reduce((a, b) => a + b, 0)}`);
  };

  main();
};
