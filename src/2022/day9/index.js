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

const directionDelta = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

async function resolveFirstChallenge(input) {
  const rope = Array.from({ length: 2 }, (_) => ({ x: 0, y: 0 }));

  const visitedPositions = new Set();

  const movements = input.split(/\r?\n/).map((row) => row.split(" "));

  for (const [direction, numberOfSteps] of movements) {
    let stepsLeft = +numberOfSteps;
    const [head, tail] = [rope[0], rope.slice(-1)[0]];

    while (stepsLeft--) {
      head.x += directionDelta[direction].x;
      head.y += directionDelta[direction].y;

      for (let i = 1; i < rope.length; i++) {
        const [prev, curr] = [rope[i - 1], rope[i]];
        const delta = {
          x: prev.x - curr.x,
          y: prev.y - curr.y,
        };

        if (Math.abs(delta.x) >= 2 || Math.abs(delta.y) >= 2) {
          delta.x = delta.x === 0 ? 0 : delta.x > 0 ? 1 : -1;
          delta.y = delta.y === 0 ? 0 : delta.y > 0 ? 1 : -1;

          curr.x += delta.x;
          curr.y += delta.y;
        }
      }

      visitedPositions.add(`${tail.x} ${tail.y}`);
    }
  }

  // console.log(
  //   `The number of steps visited by the tail is ${visitedPositions.size}`,
  // );

  return visitedPositions.size;
}

async function resolveSecondChallenge(input) {
  const rope = Array.from({ length: 10 }, (_) => ({ x: 0, y: 0 }));

  const visitedPositions = new Set();

  const movements = input.split(/\r?\n/).map((row) => row.split(" "));

  for (const [direction, numberOfSteps] of movements) {
    let stepsLeft = +numberOfSteps;
    const [head, tail] = [rope[0], rope.slice(-1)[0]];

    while (stepsLeft--) {
      head.x += directionDelta[direction].x;
      head.y += directionDelta[direction].y;

      for (let i = 1; i < rope.length; i++) {
        const [prev, curr] = [rope[i - 1], rope[i]];
        const delta = {
          x: prev.x - curr.x,
          y: prev.y - curr.y,
        };

        if (Math.abs(delta.x) >= 2 || Math.abs(delta.y) >= 2) {
          delta.x = delta.x === 0 ? 0 : delta.x > 0 ? 1 : -1;
          delta.y = delta.y === 0 ? 0 : delta.y > 0 ? 1 : -1;

          curr.x += delta.x;
          curr.y += delta.y;
        }
      }

      visitedPositions.add(`${tail.x} ${tail.y}`);
    }
  }

  // console.log(
  //   `The number of steps visited by the tail is ${visitedPositions.size}`,
  // );

  return visitedPositions.size;
}
