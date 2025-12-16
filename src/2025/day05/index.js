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
  let freshIngredients = 0

  for (const line of lines) {
    if (line.trim() === '') {
      break
    }
    ranges.push({
      min: parseInt(line.split('-')[0], 10),
      max: parseInt(line.split('-')[1], 10)
    })
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
  let lines = input.split('\n')
  let ranges = []

  for (const line of lines) {
    if (line.trim() === '') {
      break
    }
    ranges.push({
      min: parseInt(line.split('-')[0], 10),
      max: parseInt(line.split('-')[1], 10)
    })
  }

  ranges.sort((a, b) => a.min - b.min)

  let mergedRanges = []
  let currentRange = ranges[0]

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min <= currentRange.max + 1) {
      currentRange.max = Math.max(currentRange.max, ranges[i].max)
    } else {
      mergedRanges.push(currentRange)
      currentRange = ranges[i]
    }
  }
  mergedRanges.push(currentRange)

  let totalFreshIngredients = 0
  for (const range of mergedRanges) {
    totalFreshIngredients += (range.max - range.min + 1)
  }

  console.log('Number of fresh ingredients:', totalFreshIngredients)
}

run()
