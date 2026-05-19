const fs = require('fs');
const path = require('path');

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();
  await resolveFirstChallenge(input);
  await resolveSecondChallenge(input);
}

function isOrdered(update, rules) {
  for (let i = 0; i < update.length - 1; i++) {
    if (!rules.find((rule) => rule[0] === update[i] && rule[1] === update[i + 1])) {
      return false;
    }
  }
  return true;
}

function customSort(update, rules) {
  const dic = {};
  const ordered = [];

  update.forEach((page, index) => {
    dic[page] = rules.filter((rule) => rule[0] === page)
      .map((rule) => rule[1])
      .filter((rule) => update.includes(rule));
  });

  while (Object.keys(dic).length) {
    const lastPage = Object.keys(dic).find((page) => dic[page].length === 0);

    for (const page in dic) {
      dic[page] = dic[page].filter((rule) => rule !== lastPage);
    }

    delete dic[lastPage];

    ordered.unshift(lastPage);
  }

  return ordered;
}

async function resolveFirstChallenge(input) {
  const lines = input.split('\n');
  const orderingRules = lines.slice(0, lines.indexOf('')).map((x) => x.split('|'));
  const updates = lines.slice(lines.indexOf('') + 1, lines.length).map((update) => update.split(','));

  const correctUpdates = updates.filter((update) => isOrdered(update, orderingRules));
  let sumOfMiddlePages = 0;
  for (let i = 0; i < correctUpdates.length; i++) {
    sumOfMiddlePages += parseInt(correctUpdates[i][Math.floor(correctUpdates[i].length / 2)], 10);
  }

  console.log(`The sum of all middle updates is ${sumOfMiddlePages}`);
}

async function resolveSecondChallenge(input) {
  const lines = input.split('\n');
  const orderingRules = lines.slice(0, lines.indexOf('')).map((x) => x.split('|'));
  const updates = lines.slice(lines.indexOf('') + 1, lines.length).map((update) => update.split(','));

  const incorrectUpdates = updates.filter((update) => !isOrdered(update, orderingRules));
  const orderedIncorrectUpdates = incorrectUpdates.map((update) => customSort(update, orderingRules));

  let sumOfMiddlePages = 0;
  for (let i = 0; i < orderedIncorrectUpdates.length; i++) {
    sumOfMiddlePages += parseInt(orderedIncorrectUpdates[i][Math.floor(orderedIncorrectUpdates[i].length / 2)], 10);
  }

  console.log(`The sum of all middle updates is ${sumOfMiddlePages}`);
}

run();
