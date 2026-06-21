const fs = require('fs');
const path = require('path');

module.exports = () => {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs
      .readFileSync(textFilePath, 'utf-8')
      .replace(/\n\n/g, '\n')
      .split('\n');
    return data;
  }

  function getInput() {
    return getData().map((line) => JSON.parse(line)).concat([[[2]], [[6]]]);
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
    const input = getInput();
    const strings = input.sort((a, b) => {
      const result = {};
      isInRightOrder(a, b, result);
      return result.rightOrder ? -1 : 1;
    }).map((x) => JSON.stringify(x));

    const dividerPacket1 = strings.indexOf('[[2]]');
    const dividerPacket2 = strings.indexOf('[[6]]');

    const result = (dividerPacket1 + 1) * (dividerPacket2 + 1);

    console.log(`The decoder key for the distress signal is ${result}`);
  }

  main();
};
