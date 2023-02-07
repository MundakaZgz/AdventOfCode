const fs = require('fs');
const utils = require('./utils')

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  score = 0;

  data.split(/\r?\n/).forEach((game) => {
    [rival, whatShouldIDo] = game.split(' ')
    score += utils.getPlayScoreFollowingStrategy(rival, whatShouldIDo)
  });

  console.log(`The final score is ${score}`)
});
