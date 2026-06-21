import path from 'path';
import fs from 'node:fs';

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();
  await resolveFirstChallenge(input);
  await resolveSecondChallenge(input);
}

async function resolveFirstChallenge(input) {
  console.log('First challenge not implemented');
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented');
}

export default run;
