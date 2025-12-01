const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let timesAt0 = 0
  let dial = 50
  console.log(`The dial starts pointing at ${dial}`)
  for (const line of input.split('\n')) {
    const direction = line[0]
    const value = parseInt(line.slice(1), 10)
    if (direction === 'L') {
      dial -= value
    } else if (direction === 'R') {
      dial += value
    }
    while(dial < 0) {
      dial += 100
    }
    while(dial >= 100) {
      dial -= 100
    }
    if (dial === 0) {
      timesAt0++
    }
    console.log(`The dial is rotated ${line} to point at ${dial}`)
  }
  console.log('Times leftpointing at 0:', timesAt0)
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
