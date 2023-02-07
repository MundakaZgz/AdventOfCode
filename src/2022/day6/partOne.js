const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let firstMarker = 0

  for (let i = 0; i < data.length; i++) {
    const buffer = data.slice(i,i+4).split('')
    if(areAllDifferent(buffer)) {
        firstMarker = i + 4;
        break
    }
  }

  console.log(`First marker after character: ${firstMarker}`)

});

const areAllDifferent = (arr) => {
  let set = new Set()
  arr.forEach(element => {
      set.add(element)
  });
  return set.size == arr.length
}