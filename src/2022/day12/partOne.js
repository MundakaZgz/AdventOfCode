const fs = require('fs')

const filePath = './test_input.txt'
const ROUNDS = 20

const readData = () => {
    const data = fs
        .readFileSync(filePath, "utf-8")
        .split(/\r?\n/)
        .map(row => row.split('').map(char => char.charCodeAt(0)))
    return data
}

const getStartingPoint = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      if (matrix[row][column] == 'S'.charCodeAt(0)) {
        return {row: row, column: column}
      }
    }
  }
  return {row: 0, column: 0}
}

const DIRECTIONS = [
  {direction: '^', row: -1, column: 0},
  {direction: '>', row: 0, column: 1},
  {direction: 'v', row: 1, column: 0},
  {direction: '<', row: 0, column: -1}
]

const generateTree = (node, matrix) => {
  const [MAX_ROWS, MAX_COLUMNS] = [matrix.length, matrix[0].length]
  DIRECTIONS.forEach(direction => {
    console.log(direction.direction)
    newPosition = {row: node.row + direction.row, column: node.column + direction.column}
    console.log(newPosition)
    if(newPosition.row >= 0 && newPosition.column < MAX_ROWS && newPosition.column >= 0 && newPosition.column < MAX_COLUMNS) {
      let newValue = matrix[newPosition.row][newPosition.column] 
      if(newValue == node.value + 1) {
        let newNode = new Node(newPosition.row, newPosition.column, newValue)
        node.directions.push(newNode)
        generateTree(node.directions[node.directions.length - 1], matrix)
      }
    }
  });

}

const main = () => {
    let data = readData()
    let startingPoint = getStartingPoint(data)
    let root = new Node(startingPoint.row, startingPoint.column, 'a'.charCodeAt(0))
    generateTree(root, data)
    console.log(root)
}

class Node {
  constructor (row, column, value) {
    this.row = row
    this.column = column
    this.value = value
    this.directions = []
  }
}


main()