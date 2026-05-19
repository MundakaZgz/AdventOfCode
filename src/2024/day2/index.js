const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();
  await resolveFirstChallenge(input);
  await resolveSecondChallenge(input);
}

function checkProgression(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    const distance = elements[i + 1] - elements[i];
    if (distance > 3 || distance < 1) {
      return false;
    }
  }
  return true;
}

function checkSafety(line) {
  const levels = line.split(' ').map(Number);

  const increasingProgression = checkProgression(levels);
  const decreasingProgression = checkProgression(levels.toReversed());

  return increasingProgression || decreasingProgression;
}

function checkSafetyWithDampener(line) {
  const levels = line.split(' ').map(Number);

  const increasingProgression = checkProgression(levels);
  const decreasingProgression = checkProgression(levels.toReversed());

  if (increasingProgression || decreasingProgression) {
    return true;
  }

  // Lets check removing one element until we find a safe progression #bruteforce
  for (let i = 0; i < levels.length; i++) {
    const filteredLevels = levels.filter((_, index) => index !== i);
    const filteredProgression = checkProgression(filteredLevels);
    const filteredReverseLevels = levels.toReversed().filter((_, index) => index !== i);
    const filteredReverseProgression = checkProgression(filteredReverseLevels);
    if (filteredProgression || filteredReverseProgression) {
      return true;
    }
  }

  console.log('Problematic line:', line);

  return false;
}

async function resolveFirstChallenge(input) {
  const lines = input.split('\n');
  const reports = lines.map(checkSafety).filter(Boolean);
  console.log(`There are ${reports.length} safe levels`);
}

async function resolveSecondChallenge(input) {
  const lines = input.split('\n');
  const reports = lines.map(checkSafetyWithDampener).filter(Boolean);
  console.log(`There are ${reports.length} safe levels`);
}

run();
