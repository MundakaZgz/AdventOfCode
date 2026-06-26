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
  const operations = input.split(/\r?\n/).map((row) => row.split(" "));
  let X = 1;
  let total = 0;
  let cycle = 1;

  for (const [operation, argument] of operations) {
    if (cycle % 40 == 20) {
      total += cycle * X;
    }
    cycle += 1;

    if (operation == "addx") {
      if (cycle % 40 == 20) {
        total += cycle * X;
      }
      X += Number(argument);
      cycle += 1;
    }
  }

  console.log(`The sum of the signals is ${total}`);

  return total;
}

const getPixel = (cycle, X) => {
  const column = (cycle - 1) % COLS;

  if ([X - 1, X, X + 1].includes(column)) {
    return "#";
  }
  return ".";
};

const updateScreen = (screen, X, cycle) => {
  const row = parseInt((cycle - 1) / COLS, 10);
  const col = (cycle - 1) % COLS;

  screen[row][col] = getPixel(cycle, X);
};

const COLS = 40;
const ROWS = 6;

async function resolveSecondChallenge(input) {
  const operations = input.split(/\r?\n/).map((row) => row.split(" "));
  let X = 1;
  const total = 0;
  let cycle = 1;
  const screen = new Array(ROWS)
    .fill(".")
    .map((row) => new Array(COLS).fill(" "));

  for (const [operation, argument] of operations) {
    if (operation == "noop") {
      updateScreen(screen, X, cycle);
      cycle++;
    } else {
      for (let loop = 0; loop < 2; loop++) {
        updateScreen(screen, X, cycle);
        cycle++;
      }
      X += Number(argument);
    }
  }

  console.log("The screen is");
  screen.forEach((row) => console.log(row.join("")));

  return "FBURHZCH";
}
