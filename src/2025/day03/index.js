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
  let totalOutput = 0
  let banks = input.split('\n').map(line => line.split('').map(n => parseInt(n, 10)))

  for (const bank of banks) {
    const n = bank.length
    let toRemove = n - 12
    let stack = []

    for(let battery of bank) {
      while(stack.length > 0 && toRemove > 0 && stack[stack.length -1] < battery) {
        stack.pop()
        toRemove--
      }
      stack.push(battery)
    }
    if (toRemove > 0) {
      stack = stack.slice(0, stack.length - toRemove)
    }
    const output = stack.slice(0, 12).join('')
    totalOutput += parseInt(output, 10)
  }

  console.log('The total output is:', totalOutput)
}

run()
