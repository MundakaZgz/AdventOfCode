const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let validInstructions = new RegExp(/mul\(\d{1,3},\d{1,3}\)/, 'g')
  let instructions = input.match(validInstructions)
  let result = 0
  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i].replace('mul(', '').replace(')', '').split(',')
    result += parseInt(instruction[0]) * parseInt(instruction[1])
  }
  console.log(`First challenge result: ${result}`)
}

async function resolveSecondChallenge(input) {

  let validInstructions = new RegExp(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/, 'g')
  let instructions = input.match(validInstructions)
  let result = 0
  let mulEnabled = true
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === 'do()') {
      mulEnabled = true
      continue
    }
    if (instructions[i] === 'don\'t()') {
      mulEnabled = false
      continue
    }
    if (!mulEnabled) continue
    let instruction = instructions[i].replace('mul(', '').replace(')', '').split(',')
    result += parseInt(instruction[0]) * parseInt(instruction[1])
  }
  console.log(`Second challenge result: ${result}`)
}

run()
