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
  let numAssignmentsFullyContained = 0;
  const data = input.split(/\r?\n/);
  for (const pair of data) {
    const [assignment1, assignment2] = pair.split(",", 2);
    const [lower1, upper1] = assignment1.split("-", 2).map(Number);
    const [lower2, upper2] = assignment2.split("-", 2).map(Number);

    if (
      (lower1 >= lower2 && upper1 <= upper2) ||
      (lower2 >= lower1 && upper2 <= upper1)
    ) {
      numAssignmentsFullyContained++;
    }
  }
  // console.log(
  //   `There are ${numAssignmentsFullyContained} assignments that overlap`,
  // );
  return numAssignmentsFullyContained;
}

async function resolveSecondChallenge(input) {
  let numAssignmentsFullyContained = 0;
  const data = input.split(/\r?\n/);

  for (const pair of data) {
    const [assignment1, assignment2] = pair.split(",", 2);
    const [lower1, upper1] = assignment1.split("-", 2).map(Number);
    const [lower2, upper2] = assignment2.split("-", 2).map(Number);

    if (lower1 <= upper2 && upper1 >= lower2) {
      numAssignmentsFullyContained++;
    }
  }

  // console.log(
  //   `There are ${numAssignmentsFullyContained} assignments that overlap`,
  // );

  return numAssignmentsFullyContained;
}
