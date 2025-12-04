const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function isInvalidId(id) {
  const strId = id.toString()
  const length = strId.length
  if (length % 2 === 0) {
    return strId.slice(0, length / 2) === strId.slice(length / 2)
  }
  return false
}

async function resolveFirstChallenge(input) {
  let invalidIDsSum = 0
  let ranges = input.split(',')

  for (const line of ranges) {
    const [min, max] = line.split('-').map(v => parseInt(v, 10))
    for (let i = min; i <= max; i++) {
      if (isInvalidId(i)) {
        invalidIDsSum += i
      }
    }
  }

  console.log('Sum of all invalid IDs:', invalidIDsSum)
}

hasSequences = (id) => {
  const strId = id.toString()
  
  for (let length = 1; length <= Math.floor(strId.length / 2); length++) {
    if (strId.length % length !== 0) {
      continue
    }
    
    const substring = strId.slice(0, length)
    const repetitions = strId.length / length
    
    const repeated = substring.repeat(repetitions)
    if (repeated === strId) {
      return true
    }
  }
  
  return false
}


async function resolveSecondChallenge(input) {
  let invalidIDsSum = 0
  let ranges = input.split(',')

  for (const line of ranges) {
    const [min, max] = line.split('-').map(v => parseInt(v, 10))
    for (let i = min; i <= max; i++) {
      if (isInvalidId(i) || hasSequences(i)) {
        invalidIDsSum += i
      }
    }
  }

  console.log('Sum of all invalid IDs:', invalidIDsSum)
}

run()
