const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let lines = data.split(/\r?\n/)
  let crates = []

  for(let i = 0; i<(lines[0].length+1)/4;i++) {
    crates.push([])
  }

  loadCrates(lines,crates)
  moveCrates(lines,crates)

  let topCrates = crates.map((x)=>{return x.at(0)}).join('')
  console.log(`The crates at the top are ${topCrates}`)
});

const loadCrates = (lines, crates) => {

  const crateContent = /[A-Z]/gm
  const isCrateContent = new RegExp(crateContent);

  for(var i = 0; i < lines.length; i++) {
    var line = lines[i]
    if(line.length == 0) {
      break;
    }
    for(let j=0;j<line.length;j++) {
      let char = line[j]
      if(isCrateContent.test(char)) {
        crates[Math.floor(j / 4)].push(char)
      }
    }
  };
}

const moveCrates = (lines, crates) => {
  const movementRegex = /move (\d+) from (\d+) to (\d+)/
  const movementRegexRecognizer = new RegExp(movementRegex)
  lines.forEach(line => {
    let matches = movementRegexRecognizer.exec(line)
    if(matches) {
      const [numOfCrates, from, to] = matches.splice(1,4).map(Number)

      for (let i = 0; i < numOfCrates; i++) {
        crates[from-1].reverse()
        crates[to - 1].reverse()
        crates[to - 1].push(crates[from - 1].pop())
        crates[from-1].reverse()
        crates[to - 1].reverse()
      }
    }
  });
}