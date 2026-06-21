const fs = require("fs");
const path = require("path");

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, "input.txt");
    const data = fs.readFileSync(textFilePath, "utf8").split(/\r?\n/);
    return data;
  }

  function getConfigurationAndRecords(data) {
    const output = {
      configurations: [],
      records: [],
    };

    for (let row = 0; row < data.length; row++) {
      const configuration = data[row].split(" ")[0].split("");
      const record = data[row]
        .split(" ")[1]
        .split(",")
        .map((record) => parseInt(record, 10));
      output.configurations.push(configuration);
      output.records.push(record);
    }

    return output;
  }

  function isValidArrangement(records) {
    let regex = "^\\.*";

    for (let i = 0; i < records.length; i++) {
      regex += `#{${records[i]}}`;
      if (i < records.length - 1) {
        regex += "\\.+";
      }
    }
    regex += "\\.*$";

    return new RegExp(regex);
  }

  class Node {
    constructor(value) {
      this.value = value;
      if (value === "?") {
        this.left = new Node(".");
        this.right = new Node("#");
      } else {
        this.left = null;
        this.right = null;
      }
    }
  }

  function addValueToLeafs(value, node) {
    if (!node.left) {
      node.left = new Node(value === "?" ? "." : value);
    } else {
      addValueToLeafs(value, node.left);
    }

    if (!node.right) {
      node.right = new Node(value === "?" ? "#" : value);
    } else {
      addValueToLeafs(value, node.right);
    }
  }

  function getPath(node, path, resultSet, validationFunction) {
    if (!node) return;

    path += node.value === "?" ? "" : node.value;
    if (
      node.left === null &&
      node.right === null &&
      validationFunction.test(path)
    ) {
      resultSet.add(path);
    }
    getPath(node.left, path, resultSet, validationFunction);
    getPath(node.right, path, resultSet, validationFunction);
  }

  function getArrangements(configuration, validationFunction) {
    const configTreeRoot = new Node(configuration[0]);

    for (let i = 1; i < configuration.length; i++) {
      addValueToLeafs(configuration[i], configTreeRoot);
    }

    const resultSet = new Set();
    getPath(configTreeRoot, "", resultSet, validationFunction);

    return [...resultSet];
  }

  const main = () => {
    const data = getData();
    const configurationsAndRecords = getConfigurationAndRecords(data);
    const arrangements = [];
    for (let i = 0; i < configurationsAndRecords.configurations.length; i++) {
      const configuration = configurationsAndRecords.configurations[i];
      const records = configurationsAndRecords.records[i];
      const validationFunction = isValidArrangement(records);
      arrangements.push(getArrangements(configuration, validationFunction));
    }

    console.log(
      `The sum of all possible arrangements is ${arrangements.map((x) => x.length).reduce((a, b) => a + b, 0)}`,
    );
  };

  main();
};
