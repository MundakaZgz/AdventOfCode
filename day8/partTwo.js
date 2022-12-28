const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let treeArray = loadData(data)
  const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length]
  let maximumVisibility = 0
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      maximumVisibility = Math.max(maximumVisibility, calculateScenicScore(treeArray, row, col))
    }
  }

  console.log(`The maximim visibility is ${maximumVisibility} visible trees`)

});

const loadData = (data) => {
  return data.split(/\r?\n/).map(n => n.split(''))
}

const isBorder = (treeArray, row, col) => {
  const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length]
  return row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1
}

const calculateScenicScore = (treeArray, row, col) => {
  if (isBorder(treeArray, row, col)) return 0

  const scoreAccumulator = ({ count, stop }, el) => {
    if (stop) return { count, stop }

    stop = el >= treeArray[row][col]
    count += 1

    return { count, stop }
  }

  const [rowValues, colValues] = [
    treeArray[row],
    Array.from({ length: treeArray.length }, (_, i) => treeArray[i][col]),
  ]

  return [
    rowValues
      .slice(0, col)
      .reverse()
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    rowValues
      .slice(col + 1)
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    colValues
      .slice(0, row)
      .reverse()
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    colValues
      .slice(row + 1)
      .reduce(scoreAccumulator, { count: 0, stop: false }).count,
  ].reduce((acc, el) => acc * el, 1)

}