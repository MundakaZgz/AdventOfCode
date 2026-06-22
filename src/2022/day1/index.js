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

async function resolveFirstChallenge(input) {
  const data = input.split(/\r?\n/);

  const elves = [0];
  let elfNumber = 0;

  for (const line of data) {
    if (line === "") {
      elfNumber++;
      elves[elfNumber] = 0;
    } else {
      elves[elfNumber] += parseInt(line, 10);
    }
  }

  const maxCalories = Math.max(...elves);
  //const numberOfElfWithMaxCalories = elves.indexOf(maxCalories) + 1;

  // console.log(`The elf with the most number of calories is elf number ${numberOfElfWithMaxCalories} with ${maxCalories} calories`);

  return maxCalories;
}

async function resolveSecondChallenge(input) {
  const data = input.split(/\r?\n/);
  const elves = [0];
  let elfNumber = 0;

  for (const line of data) {
    if (line === "") {
      elfNumber++;
      elves[elfNumber] = 0;
    } else {
      elves[elfNumber] += parseInt(line, 10);
    }
  }
  const topThreeElves = elves.sort((a, b) => b - a).slice(0, 3);
  const topThreeCaloriesSum = topThreeElves.reduce((acc, curr) => acc + curr);

  // console.log(`The sum of the calories of the top 3 elves ${topThreeElves} is ${topThreeCaloriesSum} and the maximum is ${Math.max(...elves)}`);

  return topThreeCaloriesSum;
}
