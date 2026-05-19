const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getCardsInfo(line) {
    const cleanLine = line.replaceAll(/\s+/g, ' ');
    const lineParts = cleanLine.split(':');
    const numberGroups = lineParts[1].split('|').map((group) => group.trim().split(' '));
    return {
      cardNumber: parseInt(lineParts[0].split(' ')[1]),
      myNumbers: numberGroups[0],
      winningNumbers: numberGroups[1],
    };
  }

  const getScore = (cards) => {
    let hits = 0;

    cards.myNumbers.forEach((number) => {
      if (cards.winningNumbers.includes(number)) {
        hits++;
      }
    });

    return hits;
  };

  function prepareCardDeck(cards) {
    const cardDeck = [];
    cards.forEach((card) => {
      const score = getScore(card);
      cardDeck.push({
        cardNumber: card.cardNumber, score, scratched: 0, available: 1,
      });
    });
    return cardDeck;
  }

  function countAvailableCardsToScratch(cardDeck) {
    return cardDeck.reduce((a, b) => a + b.available, 0);
  }

  function scratchCard(cardNumber, cardDeck) {
    const card = cardDeck[cardNumber - 1];
    for (let i = 1; i <= card.score; i++) {
      cardDeck[cardNumber + i - 1].available++;
    }
    card.scratched++;
    card.available--;
    cardDeck[cardNumber - 1] = card;
  }

  const main = () => {
    const lines = getData();
    const cards = lines.map(getCardsInfo);
    const cardDeck = prepareCardDeck(cards);

    while (countAvailableCardsToScratch(cardDeck) > 0) {
      for (let i = 0; i < cardDeck.length; i++) {
        if (cardDeck[i].available > 0) {
          scratchCard(cardDeck[i].cardNumber, cardDeck);
          break;
        }
      }
    }

    console.log(`The number of scratched cards is ${cardDeck.reduce((a, b) => a + b.scratched, 0)}`);
  };

  main();
};
