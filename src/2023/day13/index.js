const fs = require("fs");
const path = require("path");

async function run() {
  const input = fs
    .readFileSync(path.join(__dirname, "input_text.txt"), "utf8")
    .trim();
  await resolveFirstChallenge(input);
  await resolveSecondChallenge(input);
}

function isMirrorArray(arr, index) {
  let mirrored = true;
  let leftIndex = index;
  let rightIndex = index + 1;
  while (leftIndex >= 0 && rightIndex < arr.length && mirrored) {
    if (arr[leftIndex] !== arr[rightIndex]) {
      mirrored = false;
    }
    leftIndex--;
    rightIndex++;
  }
  return mirrored;
}

function findMirrorRowsAndColumns(matrix) {}

async function resolveFirstChallenge(input) {
  let matrix = [];
  let result = 0;

  for (const line of input.split("\n")) {
    if (line.length === 0) {
      const mirrorResults = findMirrorRowsAndColumns(matrix);
      for (let i = 0; i++; i < mirrorResults.mirrorRows.length) {
        result +=
          mirrorResults.mirrorColumns[i] + 100 * mirrorResults.mirrorRows[i];
      }
      matrix = [];
    } else {
      matrix.push(line);
    }
  }

  console.log(
    `The number I get after summarizing all of your notes is ${result}`,
  );
}

async function resolveSecondChallenge(input) {
  console.log("Second challenge not implemented");
}

run();
