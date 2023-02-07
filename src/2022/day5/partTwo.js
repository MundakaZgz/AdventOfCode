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
  crates.map(x=>x.reverse())
  moveCrates(lines,crates)

  let topCrates = crates.map((x)=>{return x.at(-1)}).join('')
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

      let accumulator = [];
      for (let i = 0; i < numOfCrates; i++) {
        let poped = crates[from - 1].pop();
        accumulator.push(poped);
      }
      accumulator.reverse();
      crates[to - 1] = [...crates[to - 1], ...accumulator];

    }
  });
}