let year = process.argv[2];
let day = process.argv[3];

async function executeChallenge() {
  try {
    const challenge = require(`./src/${year}/day${day}/index.js`);
    if (typeof challenge === 'function') {
      challenge();
    }
  } catch (error) {
    console.log(`${error.message}. \nSetting up challenge for year ${year}, day ${day}...`);
    await copyTemplate();
  }
}

async function copyTemplate () {
  try {
    await require('./src/template/challengeSetup.js')
    console.log('Challenge setup completed, please run the challenge again')
  } catch (ex) {
    console.error(`Unable to run solution for year ${year} day ${day}: ${ex}`, ex.stack)
  }
}

async function start() {
  try {
    await executeChallenge(year, day);
  } catch (error) {
    if(!year) {
      console.error('Please specify a year');
    } else if(!day) {
      console.error('Please specify a day');
    } else {
      await copyTemplate();
    }
  }
}

start();