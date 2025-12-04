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
  let totalTimesAt0 = 0
  let dial = 50
  
  console.log(`The dial starts pointing at ${dial}`)
  for (const line of input.split('\n')) {
    const direction = line[0]
    let value = parseInt(line.slice(1), 10)
    let timesAt0 = 0 

    if (value > 100) {
      // Count full rotations
      timesAt0 += Math.floor(value / 100)
      value = value % 100
    }

    if(direction === 'L') {
      if(dial - value < 0 && dial !== 0) {
        timesAt0++
      }
      dial = dial - value
      if(dial < 0) {
        dial += 100
      }
    }

    if(direction === 'R') {
      if(dial + value  > 100 && dial !== 0) {
        timesAt0++
      }
      dial = dial + value
      if(dial >= 100) {
        dial -= 100
      }
    }

    if (dial === 0) {
      // end of a rotation
      timesAt0++
    }

    totalTimesAt0 += timesAt0

    console.log(`The dial is rotated ${line} to point at ${dial}` + (timesAt0 > 0 && dial !== 0 ? ` (during this rotation, it points at 0 ${timesAt0}.` : '') )
  }
  console.log('Times passing by 0:', totalTimesAt0)
}


run()
