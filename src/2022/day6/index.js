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

function areAllDifferent(arr) {
  const set = new Set();
  arr.forEach((element) => {
    set.add(element);
  });
  return set.size === arr.length;
}

async function resolveFirstChallenge(input) {
  let firstMarker = 0;
  const data = input;

  for (let i = 0; i < data.length; i++) {
    const buffer = data.slice(i, i + 4).split("");
    if (areAllDifferent(buffer)) {
      firstMarker = i + 4;
      break;
    }
  }

  // console.log(`First marker after character: ${firstMarker}`);

  return firstMarker;
}

async function resolveSecondChallenge(input) {
  let firstMarker = 0;

  const data = input;

  for (let i = 0; i < data.length; i++) {
    const buffer = data.slice(i, i + 14).split("");
    if (areAllDifferent(buffer)) {
      firstMarker = i + 14;
      break;
    }
  }

  // console.log(`First marker after character: ${firstMarker}`);

  return firstMarker;
}
