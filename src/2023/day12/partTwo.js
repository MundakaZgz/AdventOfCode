const fs = require('fs');
const { get } = require('http');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }
  
  function getConfigurationAndRecords(line) {
    let configuration = line.split(' ')[0];
    let record = line.split(' ')[1].split(',').map(record => parseInt(record));
    
    return [configuration, record];
  }
  
  
  function trimStart(str) {
    while (str.startsWith(".")) {
      str = str.substring(1);
    }
    return str;
  }

  let cache = {};
  
  function findCombinations(configuration, records) {
    const line = configuration + " " + records.join(",");
    if (cache[line]) return cache[line];
    if (records.length <= 0) return Number(!configuration.includes("#"));
    if (configuration.length - records.reduce((a, b) => a + b) - records.length + 1 < 0) return 0;
    const damagedOrUnknown = !configuration.slice(0, records[0]).includes(".");
    if (configuration.length == records[0]) return Number(damagedOrUnknown);
    return cache[line] ??= (configuration[0] != "#" ? findCombinations(trimStart(configuration.slice(1)), records) : 0) +
    (damagedOrUnknown && configuration[records[0]] != "#" ? findCombinations(trimStart(configuration.slice(records[0] + 1)), records.slice(1)) : 0);
  }
  const main = () => {
    let data = getData();
    let result = 0;
    
    for (const line of data) {
      const [configuration, records] = getConfigurationAndRecords(line);
      result += findCombinations(Array(5).fill(configuration).join("?"), Array(5).fill(records).flat());
    }
    
    console.log(`The sum of all possible arrangements is ${result}`)
  };
  
  main();
};

