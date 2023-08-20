const fs = require('fs');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8');
    return data;
  }
  
  
  function areAllDifferent (arr) {
    const set = new Set();
    arr.forEach((element) => {
      set.add(element);
    });
    return set.size == arr.length;
  };
  
  function main() {
    let firstMarker = 0;
    
    const data = getData();
    
    for (let i = 0; i < data.length; i++) {
      const buffer = data.slice(i, i + 14).split('');
      if (areAllDifferent(buffer)) {
        firstMarker = i + 14;
        break;
      }
    }
    
    console.log(`First marker after character: ${firstMarker}`);
  }
  
  main();
  
};
