const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function getMatrixFromInput(input) {
  return input.split('\n').map((line) => line.split(''))
}

function findXMas(matrix, i, j) {
  let xMASFound = 0

  // Check right
  if(j + 3 < matrix[i].length) {
    if(matrix[i][j + 1] === 'M' && matrix[i][j + 2] === 'A' && matrix[i][j + 3] === 'S') {
      xMASFound++
    }
  }

  // Check left
  if(j - 3 >= 0) {
    if(matrix[i][j - 1] === 'M' && matrix[i][j - 2] === 'A' && matrix[i][j - 3] === 'S') {
      xMASFound++
    }
  }

  // Check up
  if(i - 3 >= 0) {
    if(matrix[i - 1][j] === 'M' && matrix[i - 2][j] === 'A' && matrix[i - 3][j] === 'S') {
      xMASFound++
    }
  }

  // Check down
  if(i + 3 < matrix.length) {
    if(matrix[i + 1][j] === 'M' && matrix[i + 2][j] === 'A' && matrix[i + 3][j] === 'S') {
      xMASFound++
    }
  }

  // Check up-right
  if(i - 3 >= 0 && j + 3 < matrix[i].length) {
    if(matrix[i - 1][j + 1] === 'M' && matrix[i - 2][j + 2] === 'A' && matrix[i - 3][j + 3] === 'S') {
      xMASFound++
    }
  }

  // Check up-left
  if(i - 3 >= 0 && j - 3 >= 0) {
    if(matrix[i - 1][j - 1] === 'M' && matrix[i - 2][j - 2] === 'A' && matrix[i - 3][j - 3] === 'S') {
      xMASFound++
    }
  }

  // Check down-right 
  if(i + 3 < matrix.length && j + 3 < matrix[i].length) {
    if(matrix[i + 1][j + 1] === 'M' && matrix[i + 2][j + 2] === 'A' && matrix[i + 3][j + 3] === 'S') {
      xMASFound++
    }
  }

  // Check down-left
  if(i + 3 < matrix.length && j - 3 >= 0) {
    if(matrix[i + 1][j - 1] === 'M' && matrix[i + 2][j - 2] === 'A' && matrix[i + 3][j - 3] === 'S') {
      xMASFound++
    }
  }

  return xMASFound
}

function foundCrossMas(matrix, i, j) {
  let foundMasInFirstDiagonal = false
  let foundMasInSecondDiagonal = false

  if(i + 1 < matrix.length && j + 1 < matrix[i].length && i - 1 >= 0 && j - 1 >= 0) {
    if((matrix[i - 1][j - 1] === 'M' && matrix[i + 1][j + 1] === 'S')|| (matrix[i - 1][j - 1] === 'S' && matrix[i + 1][j + 1] === 'M')) {
      foundMasInFirstDiagonal = true
    }
    if((matrix[i - 1][j + 1] === 'M' && matrix[i + 1][j - 1] === 'S')|| (matrix[i - 1][j + 1] === 'S' && matrix[i + 1][j - 1] === 'M')) {
      foundMasInSecondDiagonal = true
    }
  }

  return foundMasInFirstDiagonal && foundMasInSecondDiagonal
}

async function resolveFirstChallenge(input) {
  let matrix = getMatrixFromInput(input)
  let result = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 'X') {
        result += findXMas(matrix, i, j)
      }
    }
  }
  console.log('The number of XMAS found is', result)
}

async function resolveSecondChallenge(input) {
  let matrix = getMatrixFromInput(input)
  let result = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 'A') {
        result += foundCrossMas(matrix, i, j) ? 1 : 0
      }
    }
  }
  console.log('The number of Cross MAS found is', result)
}

run()
