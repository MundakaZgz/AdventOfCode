const year = process.argv[2];
const day = process.argv[3];

function executeChallenge(year, day) {
  console.group(`Day ${day}`);
  try {
    const challenge = require(`./src/${year}/day${day}/index.js`);
    if (typeof challenge === 'function') {
      challenge();
    }
  } catch (error) {
    console.error(`Error loading challenge for year ${year}, day ${day}:`, error);
  }
  console.groupEnd();
}

function executeYearChallenges(year, day) {
  console.group(year);
  if (day) {
    executeChallenge(year, day);
  } else {
    for (let day = 1; day < 25; day++) {
      executeChallenge(year, day);
    }
  }
  console.groupEnd();
}

if (year) {
  executeYearChallenges(year, day);
} else {
  for (let year = 2022; year < new Date().getFullYear(); year++) {
    executeYearChallenges(year);
  }
}