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

function isBorder(treeArray, row, col) {
  const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length];
  return (
    row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1
  );
}

function isVisible(treeArray, row, col) {
  if (isBorder(treeArray, row, col)) return true;

  const isValid = (cellValue) => cellValue < treeArray[row][col];
  const numberOfRows = treeArray.length;

  const [rowValues, colValues] = [
    treeArray[row],
    Array.from({ length: numberOfRows }, (_, i) => treeArray[i][col]),
  ];

  return [
    rowValues.slice(0, col).every(isValid),
    rowValues.slice(col + 1).every(isValid),
    colValues.slice(0, row).every(isValid),
    colValues.slice(row + 1).every(isValid),
  ].some(Boolean);
}

function countVisibleTrees(treeArray) {
  let visibleTrees = 0;
  const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length];

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      visibleTrees += isVisible(treeArray, row, col);
    }
  }
  return visibleTrees;
}

function calculateScenicScore(treeArray, row, col) {
  if (isBorder(treeArray, row, col)) return 0;

  const scoreAccumulator = ({ count, stop }, el) => {
    if (stop) return { count, stop };

    stop = el >= treeArray[row][col];
    count += 1;

    return { count, stop };
  };

  const [rowValues, colValues] = [
    treeArray[row],
    Array.from({ length: treeArray.length }, (_, i) => treeArray[i][col]),
  ];

  return [
    rowValues
      .slice(0, col)
      .reverse()
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    rowValues.slice(col + 1).reduce(scoreAccumulator, { count: 0, stop: false })
      .count,
    colValues
      .slice(0, row)
      .reverse()
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    colValues.slice(row + 1).reduce(scoreAccumulator, { count: 0, stop: false })
      .count,
  ].reduce((acc, el) => acc * el, 1);
}

async function resolveFirstChallenge(input) {
  const treeArray = input.split(/\r?\n/).map((n) => n.split(""));
  return countVisibleTrees(treeArray);
}

async function resolveSecondChallenge(input) {
  const treeArray = input.split(/\r?\n/).map((n) => n.split(""));
  const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length];
  let maximumVisibility = 0;
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      maximumVisibility = Math.max(
        maximumVisibility,
        calculateScenicScore(treeArray, row, col),
      );
    }
  }

  // console.log(`The maximim visibility is ${maximumVisibility} visible trees`);

  return maximumVisibility;
}
