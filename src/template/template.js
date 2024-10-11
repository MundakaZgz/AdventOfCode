const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  console.log('First challenge not implemented')
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
