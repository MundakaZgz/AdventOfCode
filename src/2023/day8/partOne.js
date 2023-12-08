const fs = require('fs');
const path = require('path');

module.exports = function () {
    
    function getData() {
        const textFilePath = path.join(__dirname, 'input.txt');
        const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
        return data;
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
        let steps = 0;
        let currentPosition = 'AAA';

        do {
          currentPosition = map[currentPosition][path[steps % path.length]];
          steps++;
        } while (currentPosition !== 'ZZZ')

        console.log(`The number of steps to get to ZZZ is: ${steps}`);
    };
    
    main();
};

