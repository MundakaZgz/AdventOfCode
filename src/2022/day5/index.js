import fs from "node:fs";

export async function run() {
  const input = fs
    .readFileSync(new URL(`./input.txt`, import.meta.url), "utf8")
    .trim();
  const result1 = await resolveFirstChallenge(input);
  if (result1) {
    console.log(`The result of part 1 is ${result1}`);
  }
  const result2 = await resolveSecondChallenge(input);
  if (result2) {
    console.log(`The result of part 2 is ${result2}`);
  }
}

 function loadCrates(lines, crates) {
    const isCrateContent = /[A-Z]/;

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

  function moveCratesWith9000(lines, crates) {
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

// TODO: Check why the result does not match with the submitted.
async function resolveFirstChallenge(input) {
    const crates = [];
    const lines = input.split(/\r?\n/);

    const lineOfStacks = lines.find((line) => line.trim().startsWith("1"));
    const stackNumbers = lineOfStacks.split(' ').filter((x) => x.trim().length > 0);
    const numberOfPiles = parseInt(stackNumbers[stackNumbers.length - 1], 10);

    for (let i = 0; i < numberOfPiles; i++) {
      crates.push([]);  
    }

    loadCrates(lines, crates);
    crates.map((x) => x.reverse());
    moveCratesWith9000(lines, crates);

    const topCrates = crates.map((x) => x.at(-1)).join("");
    // console.log(`The crates at the top are ${topCrates}`);
    return topCrates;
}

  function moveCratesWith9001(lines, crates) {
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
        accumulator.reverse();
        crates[to - 1] = [...crates[to - 1], ...accumulator];
      }
    });
  }

// TODO: Check why the result does not match with the submitted.
async function resolveSecondChallenge(input) {
    const crates = [];
    const lines = input.split(/\r?\n/);

    const lineOfStacks = lines.find((line) => line.trim().startsWith("1"));
    const stackNumbers = lineOfStacks.split(' ').filter((x) => x.trim().length > 0);
    const numberOfPiles = parseInt(stackNumbers[stackNumbers.length - 1], 10);

    for (let i = 0; i < numberOfPiles; i++) {
      crates.push([]);  
    }

    loadCrates(lines, crates);
    crates.map((x) => x.reverse());
    moveCratesWith9001(lines, crates);

    const topCrates = crates.map((x) => x.at(-1)).join("");
    // console.log(`The crates at the top are ${topCrates}`);
    return topCrates;
}
