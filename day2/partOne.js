const fs = require('fs');
const utils = require('./utils')

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  score = 0;

  data.split(/\r?\n/).forEach(game => {
    plays = game.split(' ')
    score += utils.getPlayScore(plays[0], plays[1])
  });
  
  console.log(`The final score is ${score}`)
});
