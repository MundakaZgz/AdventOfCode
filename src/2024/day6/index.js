const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let map = input.split('\n').map(row => row.split(''))
  let guardPosition = {
    y: Math.round(input.indexOf('^') / map[0].length) - 1,
    x: map[Math.round(input.indexOf('^') / map[0].length) - 1].indexOf('^')
  }
  simulateGuardPatrol(guardPosition, map);

  let count = 0
  map.forEach(row => {
    row.forEach(cell => {
      if (cell === 'X') {
        count++
      }
    })
  })
  
  console.log('The number of visited cells is ', count)
}

function simulateGuardPatrol(guardPosition, map) {
  let currentDirection = 0;
  let visitedCellsWithDirection = []
  map[guardPosition.y][guardPosition.x] = 'X';
  while (guardPosition.y > 0 && guardPosition.y < map.length - 1 && guardPosition.x > 0 && guardPosition.x < map[0].length - 1) {
    switch (currentDirection) {
      case 0:
        if (map[guardPosition.y - 1][guardPosition.x] !== '#' && map[guardPosition.y - 1][guardPosition.x] !== 'O') {
          guardPosition.y--;
          map[guardPosition.y][guardPosition.x] = 'X';
          if(visitedCellsWithDirection.includes(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)){
            return true
          } else {
            visitedCellsWithDirection.push(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)
          }

        } else {
          currentDirection = 1;
        }
        break;
      case 1:
        if (map[guardPosition.y][guardPosition.x + 1] !== '#' && map[guardPosition.y][guardPosition.x + 1] !== 'O') {
          guardPosition.x++;
          map[guardPosition.y][guardPosition.x] = 'X';
          if(visitedCellsWithDirection.includes(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)){
            return true
          } else {
            visitedCellsWithDirection.push(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)
          }

        } else {
          currentDirection = 2;
        }
        break;
      case 2:
        if (map[guardPosition.y + 1][guardPosition.x] !== '#' && map[guardPosition.y + 1][guardPosition.x] !== 'O') {
          guardPosition.y++;
          map[guardPosition.y][guardPosition.x] = 'X';
          if(visitedCellsWithDirection.includes(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)){
            return true
          } else {
            visitedCellsWithDirection.push(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)
          }

        } else {
          currentDirection = 3;
        }
        break;
      case 3:
        if (map[guardPosition.y][guardPosition.x - 1] !== '#' && map[guardPosition.y][guardPosition.x - 1] !== 'O') {
          guardPosition.x--;
          map[guardPosition.y][guardPosition.x] = 'X';
          if(visitedCellsWithDirection.includes(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)){
            return true
          } else {
            visitedCellsWithDirection.push(`${guardPosition.y}-${guardPosition.x}-${currentDirection}`)
          }

        } else {
          currentDirection = 0;
        }
        break;
    }
  }
  return false
}

async function resolveSecondChallenge(input) {
  let map = input.split('\n').map(row => row.split(''))
  let possibleAlternatives = 0

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] !== '^' && map[i][j] !== '#') {
        let newMap = JSON.parse(JSON.stringify(map))
        newMap[i][j] = 'O'
        let guardPosition = {
          y: Math.round(input.indexOf('^') / map[0].length) - 1,
          x: map[Math.round(input.indexOf('^') / map[0].length) - 1].indexOf('^')
        }
        if(simulateGuardPatrol(guardPosition, newMap)){
          possibleAlternatives++
        }
      }
    }
  }

  console.log('There are ', possibleAlternatives, ' possible alternatives')
}

run()
