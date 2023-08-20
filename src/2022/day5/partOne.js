const fs = require('fs');

const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function loadCrates(lines, crates) {
    const crateContent = /[A-Z]/gm;
    const isCrateContent = new RegExp(crateContent);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length === 0) {
        break;
      }
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (isCrateContent.test(char)) {
          crates[Math.floor(j / 4)].push(char);
        }
      }
    }
  }

  function moveCrates(lines, crates) {
    const movementRegex = /move (\d+) from (\d+) to (\d+)/;
    const movementRegexRecognizer = new RegExp(movementRegex);
    lines.forEach((line) => {
      const matches = movementRegexRecognizer.exec(line);
      if (matches) {
        const [numOfCrates, from, to] = matches.splice(1, 4).map(Number);

        const accumulator = [];
        for (let i = 0; i < numOfCrates; i++) {
          const poped = crates[from - 1].pop();
          accumulator.push(poped);
        }
        crates[to - 1] = [...crates[to - 1], ...accumulator];
      }
    });
  }

  function main() {
    const crates = [];

    const lines = getData();

    for (let i = 0; i < (lines[0].length + 1) / 4; i++) {
      crates.push([]);
    }
    loadCrates(lines, crates);
    crates.map((x) => x.reverse());
    moveCrates(lines, crates);

    const topCrates = crates.map((x) => x.at(-1)).join('');
    console.log(`The crates at the top are ${topCrates}`);
  }

  main();
};
