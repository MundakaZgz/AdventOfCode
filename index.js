const year = process.argv[2];
const day = process.argv[3];

import copyTemplate from './src/template/challengeSetup.js';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

async function executeChallenge() {
  try {
    const challenge = await import(new URL(`./src/${year}/day${day}/index.js`, import.meta.url));
    if (typeof challenge.run === 'function') {
      await challenge.run();
    } 
  } catch (error) {
    console.error(`${error.message}. \nUnable to run solution for year ${year} day ${day}: ${error}`, error.stack);
  }
}

async function invokeCopyTemplate() {
  try {
    copyTemplate();
    console.log('Challenge setup completed, please run the challenge again');
  } catch (ex) {
    console.error(`Unable to run solution for year ${year} day ${day}: ${ex}`, ex.stack);
  }
}

async function start() {
  console.log('Starting challenge for year', year, 'day', day);

  if (!year) {
    console.error('Please specify a year');
    return;
  }

  if (!day) {
    console.error('Please specify a day');
    return;
  }

  try {
    const yearFolderURL = fileURLToPath((new URL(`./src/${year}`, import.meta.url).href))
    const dayFolderURL = fileURLToPath((new URL(`./src/${year}/day${day}`, import.meta.url).href))

    if(!fs.existsSync(yearFolderURL) || !fs.existsSync(dayFolderURL)) {
      console.log('Algo no existe...')
      await invokeCopyTemplate();
    }
  } catch (error) {
    console.error(error)
  }

  try {
    await executeChallenge(year, day);
  } catch (error) {
    console.error(error)
  }
}

start();
