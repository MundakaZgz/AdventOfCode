const fs = require("fs");
const path = require("path");

async function run() {
  const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .trim();
  await resolveFirstChallenge(input);
  await resolveSecondChallenge(input);
}

function extractFirstAndRight(input) {
  const lines = input.split("\n");
  const left = [];
  const right = [];
  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i].split(" ");
    left.push(numbers[0]);
    right.push(numbers[numbers.length - 1]);
  }
  return { left, right };
}

async function resolveFirstChallenge(input) {
  const { left, right } = extractFirstAndRight(input);
  left.sort();
  right.sort();

  const distances = [];
  for (let i = 0; i < left.length; i++) {
    distances.push(Math.abs(left[i] - right[i]));
  }

  console.log(
    "The sun of the distances is:",
    distances.reduce((a, b) => a + b, 0),
  );
}

async function resolveSecondChallenge(input) {
  const { left, right } = extractFirstAndRight(input);

  const distances = [];
  for (let i = 0; i < left.length; i++) {
    const count = right.filter((x) => x === left[i]).length;
    distances.push(left[i] * count);
  }

  console.log(
    "The sun of the distances is:",
    distances.reduce((a, b) => a + b, 0),
  );
}

run();
