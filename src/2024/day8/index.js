const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

async function resolveFirstChallenge(input) {
  let map = input.split('\n').map((line) => line.split(''))
  let signals = collectSignals(map);

  for (let signal in signals) {
    for(let antennaA = 0; antennaA < signals[signal].length; antennaA++) {
      for(let antennaB = 0; antennaB < signals[signal].length; antennaB++) {
        if(antennaA !== antennaB) {
          calculateAntinode(map, signals[signal][antennaA], signals[signal][antennaB])
        }
      }
    }
  }

  let antinodes = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '#') {
        antinodes++
      }
    }
  }

  console.log('The number of antinodes is', antinodes)
}

function collectSignals(map) {
  let signals = {}
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '.') {
        if (!signals[map[i][j]]) {
          signals[map[i][j]] = []
        }
        signals[map[i][j]].push({ y: i, x: j })
      }
    }
  }
  return signals
}

function calculateAntinode(map, antennaA, antennaB, infinite = false) {
  do{
    let antinode = {
      x: antennaB.x + antennaB.x - antennaA.x,
      y: antennaB.y + antennaB.y - antennaA.y
    }
    if(antinode.y >= 0 && antinode.y < map.length && antinode.x >= 0 && antinode.x < map[0].length) {
      if(map[antinode.y][antinode.x] === '.') {
        map[antinode.y][antinode.x] = '#'
      }
      antennaA = antennaB
      antennaB = antinode
    } else {
      break
    }
  } while(infinite)
}

async function resolveSecondChallenge(input) {
  let map = input.split('\n').map((line) => line.split(''))
  let signals = collectSignals(map);

  for (let signal in signals) {
    for(let antennaA = 0; antennaA < signals[signal].length; antennaA++) {
      for(let antennaB = 0; antennaB < signals[signal].length; antennaB++) {
        if(antennaA !== antennaB) {
          calculateAntinode(map, signals[signal][antennaA], signals[signal][antennaB], true)
        }
      }
    }
  }

 let antinodes = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '.') {
        antinodes++
      }
    }
  }

  console.log('The number of antinodes is', antinodes)
}

run()
