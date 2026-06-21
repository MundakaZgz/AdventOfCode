const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/).map((n) => n.split(''));
    return data;
  }

  function isBorder(treeArray, row, col) {
    const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length];
    return row === 0
    || col === 0
    || row === numberOfRows - 1
    || col === numberOfCols - 1;
  }

  function isVisible(treeArray, row, col) {
    if (isBorder(treeArray, row, col)) return true;

    const isValid = (cellValue) => cellValue < treeArray[row][col];
    const numberOfRows = treeArray.length;

    const [rowValues, colValues] = [
      treeArray[row],
      Array.from({ length: numberOfRows }, (_, i) => treeArray[i][col]),
    ];

    return [
      rowValues.slice(0, col).every(isValid),
      rowValues.slice(col + 1).every(isValid),
      colValues.slice(0, row).every(isValid),
      colValues.slice(row + 1).every(isValid),
    ].some(Boolean);
  }

  function countVisibleTrees(treeArray) {
    let visibleTrees = 0;
    const [numberOfRows, numberOfCols] = [treeArray.length, treeArray[0].length];

    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        visibleTrees += isVisible(treeArray, row, col);
      }
    }
    return visibleTrees;
  }

  function main() {
    const treeArray = getData();
    const numOfVisibleTrees = countVisibleTrees(treeArray);
    console.log(`There are ${numOfVisibleTrees} visible trees`);
  }

  main();
};
