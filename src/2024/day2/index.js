const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function checkProgression(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    let distance = elements[i + 1] - elements[i]
    if (distance > 3 || distance < 1) {
      return false
    }
  }
  return true
}

function checkSafety(line) {
  let levels = line.split(' ').map(Number)

  let increasingProgression = checkProgression(levels)
  let decreasingProgression = checkProgression(levels.toReversed())

  return increasingProgression || decreasingProgression
}

function checkSafetyWithDampener(line) {
  let levels = line.split(' ').map(Number)

  let increasingProgression = checkProgression(levels)
  let decreasingProgression = checkProgression(levels.toReversed())

  if (increasingProgression || decreasingProgression) {
    return true
  }

  // Lets check removing one element until we find a safe progression #bruteforce
  for (let i = 0; i < levels.length; i++) {
    let filteredLevels = levels.filter((_, index) => index !== i)
    let filteredProgression = checkProgression(filteredLevels)
    let filteredReverseLevels = levels.toReversed().filter((_, index) => index !== i)
    let filteredReverseProgression = checkProgression(filteredReverseLevels)
    if (filteredProgression || filteredReverseProgression) {
      return true
    }
  }

  console.log('Problematic line:', line)

  return false
}

async function resolveFirstChallenge(input) {
  let lines = input.split('\n')
  let reports = lines.map(checkSafety).filter(Boolean)
  console.log(`There are ${reports.length} safe levels`)
}

async function resolveSecondChallenge(input) {
  let lines = input.split('\n')
  let reports = lines.map(checkSafetyWithDampener).filter(Boolean)
  console.log(`There are ${reports.length} safe levels`)
}

run()
