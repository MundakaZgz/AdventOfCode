const fs = require('fs');
const path = require('path');

module.exports = function () {
    
    function getData() {
        const textFilePath = path.join(__dirname, 'test_input.txt');
        const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
        return data;
    }

    function getNumberOfStepsToXXZ(startingPositions, path, map) {
      let steps = 0;
      let currentPositions = startingPositions;

      do {
        currentPositions = currentPositions.map((position) => map[position][path[steps % path.length]]);
        steps++;
      } while (!currentPositions.every((x) => x.endsWith('Z')))

      return steps;
    }

    function getPathAndMap(data) {
      let path = data[0].split('');
      let map = {};
      const dataReg = /\w{3}/g;
        for (let line = 2; line < data.length; line++) {
          let match = [...data[line].matchAll(dataReg)];
          map[match[0][0]] = {
            L: match[1][0],
            R: match[2][0]
          };
        }

        return {
            path,
            map
        }
    }

    const main = () => {
        let data = getData();
        let { path, map } = getPathAndMap(data);
        let startingPositions = Object.keys(map).filter(key => key.endsWith('A'));

        let steps = getNumberOfStepsToXXZ(startingPositions, path, map);

        console.log(`The number of steps to get all positions with an ending Z is: ${steps}`);
    };
    
    main();
};

