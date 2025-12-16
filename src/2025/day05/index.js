const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let lines = input.split('\n')
  let ranges = []
  let ids = []
  let breakignLineFound = false
  let freshIngredients = 0

  for (const line of lines) {
    if (line.trim() === '') {
      breakignLineFound = true
      continue
    }
    if (!breakignLineFound) {
      ranges.push({
        min: parseInt(line.split('-')[0], 10),
        max: parseInt(line.split('-')[1], 10)
      })
    } else {
      ids.push(parseInt(line, 10))
    }
  }

  for(id of ids) {
    for(range of ranges) {
      if(id >= range.min && id <= range.max) {
        freshIngredients++
        break
      }
    }
  }
  console.log('Number of fresh ingredients:', freshIngredients)
}

async function resolveSecondChallenge(input) {
  console.log('Second challenge not implemented')
}

run()
