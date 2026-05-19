const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  const CARD_TYPES = {
    FIVE_OF_A_KIND: 6,
    FOUR_OF_A_KIND: 5,
    FULL_HOUSE: 4,
    THREE_OF_A_KIND: 3,
    TWO_PAIR: 2,
    ONE_PAIR: 1,
    HIGH_CARD: 0,
  };

  function addJokersToHigherGroups(handSet, numberOfJokers) {
    const handSetKeys = Object.keys(handSet);
    const handSetValues = Object.values(handSet);

    const biggerGroupIndex = handSetValues.indexOf(Math.max(...handSetValues));
    handSet[handSetKeys[biggerGroupIndex]] += numberOfJokers;

    return handSet;
  }

  function getHandType(hand) {
    let handSet = {};
    const cards = hand.split(' ')[0].split('');
    let numberOfJokers = 0;

    for (let index = 0; index < cards.length; index++) {
      if (cards[index] === 'J') {
        numberOfJokers++;
      } else if (handSet[cards[index]]) {
        handSet[cards[index]]++;
      } else {
        handSet[cards[index]] = 1;
      }
    }

    handSet = addJokersToHigherGroups(handSet, numberOfJokers);

    switch (Object.keys(handSet).length) {
      case 1:
        return CARD_TYPES.FIVE_OF_A_KIND;
      case 2:
        if (Object.values(handSet).includes(4)) {
          return CARD_TYPES.FOUR_OF_A_KIND;
        }
        return CARD_TYPES.FULL_HOUSE;

      case 3:
        if (Object.values(handSet).includes(3)) {
          return CARD_TYPES.THREE_OF_A_KIND;
        }
        return CARD_TYPES.TWO_PAIR;

      case 4:
        return CARD_TYPES.ONE_PAIR;
      case 5:
        return CARD_TYPES.HIGH_CARD;
      default:
        return 'Invalid hand';
    }
  }

  function getCardValue(card) {
    switch (card) {
      case 'T':
        return 10;
      case 'J':
        return 1; // now it is the weakest card
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;
      default:
        return parseInt(card, 10);
    }
  }

  function sortHands(a, b) {
    if (a.handType > b.handType) {
      return 1;
    } if (a.handType < b.handType) {
      return -1;
    }
    // If two hands have the same type, a second ordering rule takes effect.
    // Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.
    const aCards = a.hand.split(' ')[0].split('');
    const bCards = b.hand.split(' ')[0].split('');
    for (let index = 0; index < aCards.length; index++) {
      const currentACard = aCards[index];
      const currentBCard = bCards[index];

      if (getCardValue(currentACard) > getCardValue(currentBCard)) {
        return 1;
      } if (getCardValue(currentACard) < getCardValue(currentBCard)) {
        return -1;
      }
    }
  }

  function getRanks(hands) {
    const ranks = [];
    for (let index = 0; index < hands.length; index++) {
      ranks[index] = (index + 1) * hands[index].bet;
    }
    return ranks;
  }

  const main = () => {
    const data = getData();
    const hands = [];
    for (let index = 0; index < data.length; index++) {
      hands[index] = {
        hand: data[index].split(' ')[0],
        bet: data[index].split(' ')[1],
        handType: getHandType(data[index]),
      };
    }

    const sortedHands = hands.sort(sortHands);
    const ranks = getRanks(sortedHands);

    console.log(`The sum of all the ranks is ${ranks.reduce((a, b) => a + b, 0)}`);
  };

  main();
};
