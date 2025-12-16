const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function canBeMoved(map, row, col) {
  let rollsFound = 0
  for(let offsetRow = -1; offsetRow <= 1; offsetRow++) {
    for(let offsetCol = -1; offsetCol <= 1; offsetCol++) {
      if(offsetRow !== 0 || offsetCol !== 0) {
        const newRow = row + offsetRow
        const newCol = col + offsetCol
        if(newRow >= 0 && newCol >= 0 && newRow < map.length && newCol < map[newRow].length && map[newRow][newCol] === '@') {
          rollsFound++
        }
      }
    }
  }
  return rollsFound < 4
}

async function resolveFirstChallenge(input) {
  let map = input.split('\n').map(line => line.split(''))
  let movableRolls = 0

  for(let row = 0; row < map.length; row++) {
    for(let col = 0; col < map[row].length; col++) {
      if(map[row][col] === '@') {
        if(canBeMoved(map, row, col)) {
          movableRolls++
        }
      }
    }
  }
  console.log('Number of movable rolls:', movableRolls)
}

async function resolveSecondChallenge(input) {
  let map = input.split('\n').map(line => line.split(''))

  let couldRemoveRolls = true
  let movableRolls = 0

  while(couldRemoveRolls) {
    couldRemoveRolls = false
      for(let row = 0; row < map.length; row++) {
      for(let col = 0; col < map[row].length; col++) {
        if(map[row][col] === '@') {
          if(canBeMoved(map, row, col)) {
            map[row][col] = '.'
            couldRemoveRolls = true
            movableRolls++
          }
        }
      }
    }
  }

  console.log('Number of movable rolls:', movableRolls)
}

run()
