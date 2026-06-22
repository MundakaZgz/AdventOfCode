import fs from "node:fs";

const priorities = [
      "",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

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

// TODO: Review this function as it does not match with the subnitted value
async function resolveFirstChallenge(input) {
  let sumOfPriorities = 0;

    const data = input.split(/\r?\n/);

    for (const rucksack of data) {
      const compartment1 = rucksack.slice(0, rucksack.length / 2);
      const compartment2 = rucksack.slice(-rucksack.length / 2);
      let foundLetter = "";
      compartment1.split("").forEach((letter) => {
        if (compartment2.indexOf(letter) !== -1) {
          foundLetter = letter;
        }
        sumOfPriorities += priorities.indexOf(foundLetter);
      });
    }

    // console.log(`The sum of priorities is ${sumOfPriorities}`);

    return sumOfPriorities;
}

async function resolveSecondChallenge(input) {
    let sumOfPriorities = 0;

    const lines = input.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 3) {
      const firstRucksack = lines[i].split("");
      const secondRucksack = lines[i + 1].split("");
      const thirdRucksack = lines[i + 2].split("");

      let foundLetter = "";

      firstRucksack.forEach((letter) => {
        if (
          secondRucksack.indexOf(letter) !== -1 &&
          thirdRucksack.indexOf(letter) !== -1
        ) {
          foundLetter = letter;
        }
      });

      sumOfPriorities += priorities.indexOf(foundLetter);
    }

    // console.log(`The sum of priorities is ${sumOfPriorities}`);

    return sumOfPriorities;
}
