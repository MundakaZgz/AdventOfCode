import path from "path";
import fs from "node:fs";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

async function copyTemplate() {
  const year = process.argv[2];
  const day = process.argv[3];

  dotenv.config();

  if (!year) {
    console.error("Please specify a year");
    return;
  }

  if (!day) {
    console.error("Please specify a day");
    return;
  }

  if (!process.env.AOC_SESSION_COOKIE) {
    console.error("Please specify a session cookie in .env file");
    return;
  }

  // Preparing folder structure
  let folderName = new URL(`../${year}`, import.meta.url);
  try {
    if (!fs.existsSync(fileURLToPath(folderName.href))) {
      console.log(`Year folder ${year} does not exist, creating...`);
      fs.mkdirSync(fileURLToPath(folderName.href));
    }
    let dayFolder = new URL(`../${year}/day${day}`, import.meta.url);
    if (!fs.existsSync(fileURLToPath(dayFolder.href))) {
      fs.mkdirSync(fileURLToPath(dayFolder.href));
    }
  } catch (err) {
    console.error(err);
  }

  // Copy template file from src/template/solution.js to recently created folder
  try {
    console.log("Copying template file");
    fs.copyFileSync(
      new URL("./template.js", import.meta.url),
      new URL(`../${year}/day${day}/index.js`, import.meta.url),
    );
  } catch (err) {
    console.error(err);
  }

  //   // Copy input data from AOC to recently created folder
  //   const url = `https://adventofcode.com/${year}/day/${day}/input`;

  //   console.log(`Downloading input data from ${url}`);

  //   const options = {
  //     headers: {
  //       Cookie: `session=${process.env.AOC_SESSION_COOKIE};`,
  //       'Host': 'adventofcode.com',
  //       'User-Agent': 'curl/8.7.1',
  //       'Accept': '*/*'
  //     },
  //   };

  //   // TODO: Check why this is not working
  //   await https.get(url, options, (res) => {
  //     if (res.statusCode !== 200) {
  //       console.error(`Error: ${res.statusCode}`);
  //       return;
  //     }

  //     let data = '';
  //     res.on('data', (chunk) => {
  //       data += chunk;
  //     });

  //     res.on('end', () => {
  //       fs.writeFileSync(new URL(`../${year}/day${day}/input.txt`, import.meta.url), data);
  //       console.log('Input data copied');
  //     });
  //   }).on('error', (err) => {
  //     console.error(`Error: ${err.message}`);
  //   });
}

export default copyTemplate;
