const fs = require('fs');
const path = require('path');

module.exports = function () {
    
    function getData() {
        const textFilePath = path.join(__dirname, 'input.txt');
        const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
        return data;
    }

    function extractNumbersFromLine(line) {
        return parseInt(line.split(':')[1].replaceAll(' ',''));
    }

    function getTimeAndDistanceToBeat(data) {
        let time = extractNumbersFromLine(data[0]);
        let distanceToBeat =  extractNumbersFromLine(data[1]);
        return {
            time,
            distanceToBeat,
        };
    }

    function calculateWaysToBreakTheRecord(time, distanceToBeat) {
        let waysToBreakTheRecord = 0;
        
        for (let keepingTime = 0; keepingTime < time; keepingTime++) {
            distance = keepingTime * (time - keepingTime);
            if(distance > distanceToBeat) {
                waysToBreakTheRecord++;
            }
        }

        return waysToBreakTheRecord;
    }
    
    const main = () => {
        let data = getData();
        let { time, distanceToBeat } = getTimeAndDistanceToBeat(data);
    
        let results = calculateWaysToBreakTheRecord(time, distanceToBeat);

        console.log(`The ways to break the record are ${results}`);
    };
    
    main();
};

