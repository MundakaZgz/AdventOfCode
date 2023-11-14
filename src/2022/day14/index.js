module.exports = () => {
  const partOne = require('./partOne').main;
  if (partOne) {
    partOne();
  }
  const partTwo = require('./partTwo').main;
  if (partTwo) {
    partTwo();
  }
};
