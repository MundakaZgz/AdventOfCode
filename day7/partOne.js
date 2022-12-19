const fs = require('fs');

fs.readFile('./input2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let folderStructure = new Node('/')
  folderStructure.children = []
  let currentNode = folderStructure;
  
  const changeDir = /\$ cd ([\.\w]+)/
  const changeDirRegex = new RegExp(changeDir)

  const listDir = /\$ ls/
  const listDirRegex = new RegExp(listDir)

  const directory = /dir (\w+)/
  const directoryRegex = new RegExp(directory)

  const file = /(\d+) ([\w\.]+)/
  const fileRegex = new RegExp(file)

  data.split(/\r?\n/).forEach(command => {
    if(changeDirRegex.test(command)) {
        let match = changeDirRegex.exec(command)
        let commandArg = match[1]
        if(commandArg == '..'){
            if (currentNode.parent) {
                currentNode = currentNode.parent
            } else {
                console.log('Trying to go too up we are already in node ' + currentNode.data)
            }
        } else if(commandArg == '/'){
            currentNode = folderStructure
        } else {
            for (let i = 0; i < currentNode.children.length; i++) {
                if(currentNode.children[i].data == commandArg) {
                    currentNode = currentNode.children[i]
                    break
                }
            }
        }
    }
    if(listDirRegex.test(command)) {

    }
    if(directoryRegex.test(command)) {
        let match = directoryRegex.exec(command)
        let nodesInCurrentNode = currentNode.children.map(x => x.data)
        let directoryName = match[1]
        if(nodesInCurrentNode.indexOf(directoryName) == -1){
            let newDirectory = new Node(directoryName,currentNode)
            newDirectory.children = []
            currentNode.children.push(newDirectory)
        }
    }
    if(fileRegex.test(command)) {
        let nodesInCurrentNode = currentNode.children.map(x => x.data)
        let match = fileRegex.exec(command)
        let fileSize = match[1]
        let fileName = match[2]
        if(nodesInCurrentNode.indexOf(fileName) == -1){
            let newFile = new Node(fileName,currentNode)
            newFile.fileSize = Number(fileSize)
            currentNode.children.push(newFile)
       }
    }
  });

  let dirs = [...folderStructure].filter((n) => n.children.length > 0)

  let sumBigDirs = dirs.filter((n) => n.size() > 100000).map((n)=>n.size()).reduce((a,b) => a + b, 0)


  console.log(`The size of the full directory is ${sumBigDirs}`)

});


class Node {
    constructor(data, parent = null) {
        this.parent = parent;
        this.data = data;
        this.fileSize = 0;
        this.children = [];
    }

    size = (ignore) => {
        if(ignore) {
            return 0
        }
        if(this.children.length == 0) {
            return this.fileSize
        } else {
            return this.children.map((n) => n.size(ignore)).reduce((a,b) => a + b, 0)
        }
    }

    static *walk(node) {
        for (let child of node.children) {
            yield child
            if(child.children.length > 0) {
                yield* Node.walk(child)
            }
        }
    }

    *[Symbol.iterator]() {
		yield* Node.walk(this);
	}
}