const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function isPossibleToCalculate(solution, values) {

  let calculations = [values[0]]

  for (let i = 1; i < values.length; i++) {
    let updatedCalculations = []
    for (let j = 0; j < calculations.length; j++) {
      updatedCalculations.push(calculations[j] + values[i])
      updatedCalculations.push(calculations[j] * values[i])
    }
    calculations = updatedCalculations
  }

  return calculations.includes(solution)
}

function isPossibleToCalculateWithAThirdOperator(solution, values) {

  let calculations = [values[0]]

  for (let i = 1; i < values.length; i++) {
    let updatedCalculations = []
    for (let j = 0; j < calculations.length; j++) {
      updatedCalculations.push(calculations[j] + values[i])
      updatedCalculations.push(calculations[j] * values[i])
      updatedCalculations.push(parseInt(String(calculations[j]) + String(values[i])))
    }
    calculations = updatedCalculations
  }

  return calculations.includes(solution)
}

async function resolveFirstChallenge(input) {
  let equations = input.split('\n')
  let solutions = equations.map(x => x.split(': ')[0]).map(x => parseInt(x))
  let values = equations.map(x => x.split(': ')[1].split(' ')).map(x => x.map(y => parseInt(y)))

  let result = 0

  for (let i = 0; i < solutions.length; i++) {
    if(isPossibleToCalculate(solutions[i], values[i])) {
      result += solutions[i]
    }
  }

  console.log('The sum of all solutions that can be calculated is', result)
}

async function resolveSecondChallenge(input) {
  let equations = input.split('\n')
  let solutions = equations.map(x => x.split(': ')[0]).map(x => parseInt(x))
  let values = equations.map(x => x.split(': ')[1].split(' ')).map(x => x.map(y => parseInt(y)))

  let result = 0

  for (let i = 0; i < solutions.length; i++) {
    if(isPossibleToCalculateWithAThirdOperator(solutions[i], values[i])) {
      result += solutions[i]
    }
  }

  console.log('The sum of all solutions that can be calculated is', result)
}

run()
