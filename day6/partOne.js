const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let firstMarker = 0

  for (let i = 0; i < data.length; i++) {
    const a = data[i]
    const b = data[i+1]
    const c = data[i+2]
    const d = data[i+3]
    
    if(a != b && a != c && a != d && b != c && b != d && c != d) {
      firstMarker = i + 4
      break
    }
  }

  console.log(`Characters to be processed before the first marker is found: ${firstMarker}`)

});
