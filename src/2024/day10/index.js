const fs = require('fs')
const path = require('path')
let uniquePaths = new Set()

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function findStartingPoints(map) {
  let startingPoints = []
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '0') {
        startingPoints.push({ x: j, y: i })
      }
    }
  }
  return startingPoints
}

function getNumOfTrailsFromStartingPoint(map, startingPoint, x, y, visited) {
  if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
    return
  }
  
  let currentHeight = parseInt(map[y][x])
  
  if (visited[y][x]) {
    return
  }

  if(currentHeight === 9) {
    uniquePaths.add(JSON.stringify(startingPoint) + JSON.stringify({x, y}))
    return
  }

  visited[y][x] = true

  // check x + 1
  if(x + 1 < map[0].length && parseInt(map[y][x + 1]) === currentHeight + 1) {
    getNumOfTrailsFromStartingPoint(map, startingPoint, x + 1, y, visited) 
  }

  // check x - 1
  if(x - 1 >= 0 && parseInt(map[y][x - 1]) === currentHeight + 1) {
    getNumOfTrailsFromStartingPoint(map, startingPoint, x - 1, y, visited) 
  }

  // check y + 1
  if(y + 1 < map.length && parseInt(map[y + 1][x]) === currentHeight + 1) {
    getNumOfTrailsFromStartingPoint(map, startingPoint, x, y + 1, visited) 
  }

  // check y - 1
  if(y - 1 >= 0 && parseInt(map[y - 1][x]) === currentHeight + 1) {
    getNumOfTrailsFromStartingPoint(map, startingPoint, x, y - 1, visited) 
  }
}

function countDistinctTrails(map, x, y, currentHeight, visited) {
  // Si está fuera de los límites o ya visitado, retorna 0
  if (
    x < 0 || y < 0 ||
    x >= map[0].length || y >= map.length ||
    visited[y][x]
  ) {
    return 0
  }

  if (parseInt(map[y][x]) !== currentHeight) {
    return 0
  }

  // Si llega a altura 9, es un camino válido
  if (currentHeight === 9) {
    return 1
  }

  visited[y][x] = true
  let total = 0

  // Explora las 4 direcciones posibles
  total += countDistinctTrails(map, x + 1, y, currentHeight + 1, visited)
  total += countDistinctTrails(map, x - 1, y, currentHeight + 1, visited)
  total += countDistinctTrails(map, x, y + 1, currentHeight + 1, visited)
  total += countDistinctTrails(map, x, y - 1, currentHeight + 1, visited)

  visited[y][x] = false // backtrack
  return total
}

async function resolveFirstChallenge(input) {
  let map = input.split('\n').map((line) => line.split(''))
  let startingPoints = findStartingPoints(map)
  for(let i = 0; i < startingPoints.length; i++) {
    let visited = Array(map.length).fill(false).map(() => Array(map[0].length).fill(false))
    getNumOfTrailsFromStartingPoint(map, startingPoints[i], startingPoints[i].x, startingPoints[i].y, visited)
  }

  console.log('The score is', uniquePaths.size)
}

async function resolveSecondChallenge(input) {
  let map = input.split('\n').map((line) => line.split(''))
  let rating = 0
  let startingPoints = findStartingPoints(map)
  for (let i = 0; i < startingPoints.length; i++) {
    let visited = Array(map.length).fill(false).map(() => Array(map[0].length).fill(false))
    rating += countDistinctTrails(
      map,
      startingPoints[i].x,
      startingPoints[i].y,
      0,
      visited
    )
  }
  console.log('The rating is', rating)
}

run()
