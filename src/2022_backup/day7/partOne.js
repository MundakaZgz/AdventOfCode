const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  class Directory {
    constructor(label, parent) {
      this.label = label;
      this.parent = parent;
      this.children = [];
      this.size = 0;
    }
  }

  function buildFilesystem(input) {
    const relevantInput = input.filter(
      (command) => !command.startsWith('dir') && !command.startsWith('$ ls'),
    );

    const filesystem = new Directory('/', null);

    let workingDirectory = null;
    for (const command of relevantInput) {
      if (command.startsWith('$ cd')) {
        const [, , newDirectoryLabel] = command.split(' ');

        if (newDirectoryLabel === '/') {
          workingDirectory = filesystem;
        } else if (newDirectoryLabel === '..') {
          workingDirectory = workingDirectory.parent;
        } else {
          const newDirectory = new Directory(newDirectoryLabel, workingDirectory);
          workingDirectory.children.push(newDirectory);
          workingDirectory = newDirectory;
        }
      } else {
        const [filesize] = command.split(' ');

        let current = workingDirectory;
        while (current.parent) {
          current.size += Number(filesize);
          current = current.parent;
        }
        current.size += Number(filesize);
      }
    }

    return filesystem;
  }

  function analyzeFilesystem(filesystem, action) {
    action(filesystem);

    for (const child of filesystem.children) {
      analyzeFilesystem(child, action);
    }
  }

  function main() {
    const filesystem = buildFilesystem(getData());

    let total = 0;

    analyzeFilesystem(filesystem, (directory) => {
      if (directory.size <= 100_000) total += directory.size;
    });

    console.log(`The size of the full directory is ${total}`);
  }

  main();
};
