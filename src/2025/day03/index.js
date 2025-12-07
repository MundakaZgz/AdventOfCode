const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let totalOutput = 0
  let lines = input.split('\n')

  for (const line of lines) {
    let output = 0
    let numberLine = line.split('').map(v => parseInt(v, 10)) 
    for (let index = 0; index < numberLine.length; index++) {
      for (let j = index + 1; j < numberLine.length; j++) {
        let valueFound = numberLine[index] * 10 + numberLine[j]
        if (valueFound > output) {
          output = valueFound
        }
      }
    }
    totalOutput += output
  }

  console.log('The total output is:', totalOutput)
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
