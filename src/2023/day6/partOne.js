const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function extractNumbersFromLine(line) {
    return line.split(' ').filter((x) => x.length > 0).slice(1).map((x) => parseInt(x.trim(, 10)));
  }

  function getTimeAndDistanceToBeat(data) {
    const time = extractNumbersFromLine(data[0]);
    const distanceToBeat = extractNumbersFromLine(data[1]);
    return {
      time,
      distanceToBeat,
    };
  }

  function calculateWaysToBreakTheRecord(time, distanceToBeat) {
    let waysToBreakTheRecord = 0;

    for (let keepingTime = 0; keepingTime < time; keepingTime++) {
      const distance = keepingTime * (time - keepingTime);
      if (distance > distanceToBeat) {
        waysToBreakTheRecord++;
      }
    }

    return waysToBreakTheRecord;
  }

  const main = () => {
    const data = getData();
    const { time, distanceToBeat } = getTimeAndDistanceToBeat(data);

    const results = [];
    for (let index = 0; index < time.length; index++) {
      results.push(calculateWaysToBreakTheRecord(time[index], distanceToBeat[index]));
    }

    console.log(`The multiplication of the number of ways you could beat the record for each of the events is ${results.reduce((a, b) => a * b)}`);
  };

  main();
};
