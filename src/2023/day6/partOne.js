const fs = require('fs');
const path = require('path');

module.exports = function () {
    
    function getData() {
        const textFilePath = path.join(__dirname, 'input.txt');
        const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
        return data;
    }
    
    const main = () => {
        let data = getData();

        console.log(`Part One Answer: 0`);
    };
    
    main();
};

