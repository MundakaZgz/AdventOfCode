const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let grandTotal = 0
  let lines = input.split('\n')
  
  // Separar las líneas de números de la línea de operaciones
  let numberLines = lines.slice(0, -1)
  let operationLine = lines[lines.length - 1]
  
  let operations = operationLine.trim().split(' ').filter(op => op !== '')
  let numbers = numberLines.map(line => 
    line.trim().split(/\s+/).map(Number)
  )
   
  for(let i = 0; i < operations.length; i++) {
    if(operations[i] === '+') {
      let columnSum = 0
      for(let j = 0; j < numbers.length; j++) {
        columnSum += numbers[j][i]
      }
      grandTotal += columnSum
    } else if(operations[i] === '*') {
      let columnProduct = 1
      for(let j = 0; j < numbers.length; j++) {
        columnProduct *= numbers[j][i]
      }
      grandTotal += columnProduct
    }
  }
  console.log('Grand total is:', grandTotal)
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
