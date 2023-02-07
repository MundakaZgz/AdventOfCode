const strategyToWin = {
    'A': 'Y',
    'B': 'Z',
    'C': 'X'
}
const strategyToDraw = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z'
}
const strategyToLose = {
    'A': 'Z',
    'B': 'X',
    'C': 'Y'
}

const scorePerSelection = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

const strategiesPerRound = {
    'Y': strategyToDraw,
    'X': strategyToLose,
    'Z': strategyToWin
}

const getScore = (rival, me) => {
    if(rival == 'A') { // stone 
        if(me == 'X') { // stone
            return 3;
        }
        if(me == 'Y') { // scissors
            return 6;
        }
        if(me == 'Z') { // paper
            return 0;
        }
    }
    if(rival == 'B') { // scissors
        if(me == 'X') { // stone
            return 0;
        }
        if(me == 'Y') { // scissors
            return 3;
        }
        if(me == 'Z') { // paper
            return 6;
        }
    }
    if(rival == 'C') { // paper
        if(me == 'X') { // stone
            return 6;
        }
        if(me == 'Y') { // scissors
            return 0;
        }
        if(me == 'Z') { // paper
            return 3;
        }
    }    
}

const getPlayScore = (rival, me) => {
    return getScore(rival, me) + scorePerSelection[me];
}

const getPlayScoreFollowingStrategy = (rival, whatShouldIDo) => {
    myMove = strategiesPerRound[whatShouldIDo][rival]
    return getPlayScore(rival, myMove);
}

module.exports = {
    getPlayScore,
    getPlayScoreFollowingStrategy
}