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

    function getHandType(hand) {
      let handSet = {};
      let cards = hand.split(' ')[0].split('');

      for (let index = 0; index < cards.length; index++) {
        if (handSet[cards[index]]) {
          handSet[cards[index]]++;
        } else {
          handSet[cards[index]] = 1;
        }
      }

      switch (Object.keys(handSet).length) {
        case 1:
          return CARD_TYPES.FIVE_OF_A_KIND;
        case 2:
          if (Object.values(handSet).includes(4)) {
            return CARD_TYPES.FOUR_OF_A_KIND;
          } else {
            return CARD_TYPES.FULL_HOUSE;
          }
        case 3:
          if (Object.values(handSet).includes(3)) {
            return CARD_TYPES.THREE_OF_A_KIND;
          } else {
            return CARD_TYPES.TWO_PAIR;
          }
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
          return 11;
        case 'Q':
          return 12;
        case 'K':
          return 13;
        case 'A':
          return 14;
        default:
          return parseInt(card);
      }
    }

    function sortHands(a, b) {
      if (a.handType > b.handType) {
        return 1;
      } else if (a.handType < b.handType) {
        return -1;
      } else {
        // If two hands have the same type, a second ordering rule takes effect. 
        // Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.
        let aCards = a.hand.split(' ')[0].split('');
        let bCards = b.hand.split(' ')[0].split('');
        for (let index = 0; index < aCards.length; index++) {
          let currentACard = aCards[index];
          let currentBCard = bCards[index];

          if (getCardValue(currentACard) > getCardValue(currentBCard)) {
            return 1;
          } else if (getCardValue(currentACard) < getCardValue(currentBCard)) {
            return -1;
          }
        }
      }
    }

    function getRanks(hands) {
      let ranks = [];
      for (let index = 0; index < hands.length; index++) {
        ranks[index] = (index + 1) * hands[index].bet;
      }
      return ranks;
    }
    
    const main = () => {
        let data = getData();
        let hands = [];
        for (let index = 0; index < data.length; index++) {
          hands[index] = {
            hand: data[index].split(' ')[0],
            bet: data[index].split(' ')[1],
            handType: getHandType(data[index]),
          }
        }

        let sortedHands = hands.sort(sortHands);
        let ranks = getRanks(sortedHands);

        console.log(`The sum of all the ranks is ${ranks.reduce((a, b) => a + b, 0)}`);
    };
    
    main();
};

