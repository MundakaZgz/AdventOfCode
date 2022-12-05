const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  score = 0;

  data.split(/\r?\n/).forEach(game => {
    plays = game.split(' ')
    score += getScore(plays[0], plays[1]) + scorePerSelection[plays[1]]
  });
  console.log(`The final score is ${score}`)
});

const strategy = {
    'A': 'Y',
    'B': 'X',
    'C': 'Z'
}

const scorePerSelection = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3
}

const getScore = (rival, me) => {
    if(rival == 'A') {
        if(me == 'X') {
            return 3;
        }
        if(me == 'Y') {
            return 6;
        }
        if(me == 'Z') {
            return 0;
        }
    }
    if(rival == 'B') {
        if(me == 'X') {
            return 0;
        }
        if(me == 'Y') {
            return 3;
        }
        if(me == 'Z') {
            return 6;
        }
    }
    if(rival == 'C') {
        if(me == 'X') {
            return 6;
        }
        if(me == 'Y') {
            return 0;
        }
        if(me == 'Z') {
            return 3;
        }
    }    
}
