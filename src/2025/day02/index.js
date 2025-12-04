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
        console.log('Invalid ID found:', i)
        invalidIDsSum += i
      }
    }
  }

  console.log('Sum of all invalid IDs:', invalidIDsSum)
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
