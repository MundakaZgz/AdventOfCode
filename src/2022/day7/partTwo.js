const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const filesystem = buildFilesystem(data.split(/\r?\n/))

  const currentSpace = 70_000_000 - filesystem.size;
  const requiredSpace = 30_000_000 - currentSpace;
  const candidates = [];
  
    analyzeFilesystem(filesystem, (directory) => {
      if (directory.size >= requiredSpace) candidates.push(directory);
    });
  
    const selectedFolder = Math.min(...candidates.map((candidate) => candidate.size));
    

    console.log(`The folder you have to delete is ${selectedFolder}`)

});

class Directory {
    constructor(label, parent) {
      this.label = label;
      this.parent = parent;
      this.children = [];
      this.size = 0;
    }
  }

const buildFilesystem = (input) => {
    const relevantInput = input.filter(
      (command) => !command.startsWith('dir') && !command.startsWith('$ ls')
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

  const analyzeFilesystem = (filesystem, action) => {
    action(filesystem);
  
    for (const child of filesystem.children) {
      analyzeFilesystem(child, action);
    }
  }