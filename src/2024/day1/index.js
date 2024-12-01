const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function extractFirstAndRight(input) {
  let lines = input.split('\n')
  let left = []
  let right = []
  for (let i = 0; i < lines.length; i++) {
    let numbers = lines[i].split(' ')
    left.push(numbers[0])
    right.push(numbers[numbers.length - 1])
  }
  return { left, right }
}

async function resolveFirstChallenge(input) {
  let { left, right } = extractFirstAndRight(input)
  left.sort()
  right.sort()

  let distances = []
  for (let i = 0; i < left.length; i++) {
    distances.push(Math.abs(left[i] - right[i]))
  }

  console.log('The sun of the distances is:', distances.reduce((a, b) => a + b, 0))
}

async function resolveSecondChallenge(input) {
  let { left, right } = extractFirstAndRight(input)
  
  let distances = []
  for (let i = 0; i < left.length; i++) {
    let count = right.filter(x => x === left[i]).length
    distances.push(left[i] * count)
  }

  console.log('The sun of the distances is:', distances.reduce((a, b) => a + b, 0))
}

run()
