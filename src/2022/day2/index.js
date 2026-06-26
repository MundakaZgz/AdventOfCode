import fs from "node:fs";
import utils from "./utils.js";

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
  let score = 0;

  for (const game of data) {
    const plays = game.split(" ");
    score += utils.getPlayScore(plays[0], plays[1]);
  }

  //console.log(`The final score is ${score}`);

  return score;
}

async function resolveSecondChallenge(input) {
  const data = input.split(/\r?\n/);
  let score = 0;
  for (const game of data) {
    const [rival, whatShouldIDo] = game.split(" ");
    score += utils.getPlayScoreFollowingStrategy(rival, whatShouldIDo);
  }
  //console.log(`The final score is ${score}`);

  return score;
}
