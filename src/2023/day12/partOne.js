const fs = require('fs');
const path = require('path');

module.exports = function () {
  
  function getData() {
    const textFilePath = path.join(__dirname, 'test_input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getConfigurationAndRecords(data) {
    let configuration = [];
    let records = [];

    for(let row=0; row<data.length; row++) {
      configuration.push(data[row].split(' ')[0]);
      records.push(data[row].split(' ')[1].split(',').map(record => parseInt(record)));
    }
    return [configuration, records];
  }


  const main = () => {
    let data = getData();
    let [configuration, records] = getConfigurationAndRecords(data);

    console.log(configuration);
    console.log(records);


  };
  
  main();
};

