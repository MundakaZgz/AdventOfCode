module.exports = () => {
  const partOne = require('./partOne').main;
  if (partOne) {
    partOne();
  }
  // const partTwo = require('./partTwo');
  // if (partTwo) {
  //   partTwo();
  // }
};
