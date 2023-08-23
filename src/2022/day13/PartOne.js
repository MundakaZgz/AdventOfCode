const fs = require('fs');
const path = require('path');

module.exports = () => {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs
      .readFileSync(textFilePath, 'utf-8')
      .split('\n\n');
    return data;
  }

  function getInput() {
    const data = getData();
    return data.map((group) => {
      const [left, right] = group.split('\n').map((line) => JSON.parse(line));
      return {
        left, right,
      };
    });
  }

  function isInRightOrder(left, right, result) {
    const leftIsNumber = typeof left === 'number';
    const rightIsNumber = typeof right === 'number';

    // If both values are integers, the lower integer should come first.
    if (leftIsNumber && rightIsNumber) {
      if (left < right) {
        // If the left integer is lower than the right integer, the inputs are in the right order.
        result.rightOrder = true;
      } else if (left > right) {
        // If the left integer is higher than the right integer, the inputs are not in the right order.
        result.rightOrder = false;
      }
      // Otherwise, the inputs are the same integer; continue checking the next part of the input.
    } else if (!leftIsNumber && !rightIsNumber) {
      // If both values are lists, compare the first value of each list, then the second value, and so on.
      let index = 0;
      while (true) {
        if (index > left.length - 1 && index <= right.length - 1) {
          // If the left list runs out of items first, the inputs are in the right order.
          result.rightOrder = true;
          return;
        } if (index <= left.length - 1 && index > right.length - 1) {
          // If the right list runs out of items first, the inputs are not in the right order.
          result.rightOrder = false;
          return;
        } if (index > left.length - 1 && index > right.length - 1) {
          // If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
          return;
        }

        isInRightOrder(left[index], right[index], result);
        if (typeof result.rightOrder !== 'undefined') {
          return;
        }

        index++;
      }
    } else if (leftIsNumber) {
      isInRightOrder([left], right, result);
    } else {
      isInRightOrder(left, [right], result);
    }
  }

  function main() {
    const groups = getInput();
    const result = groups.map(({ left, right }, index) => {
      const result = {};
      isInRightOrder(left, right, result);
      return result.rightOrder ? index + 1 : 0;
    }).reduce((a, b) => a + b, 0);

    console.log(`The sum of indexes of pairs in the right order is ${result}`);
  }

  main();
};
