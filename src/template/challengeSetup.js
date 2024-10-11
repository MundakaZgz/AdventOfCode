const path = require('path')
const fs = require('node:fs')
const https = require('https')

async function copyTemplate () {
  const year = process.argv[2]
  const day = process.argv[3]
  let folderName = path.join(__dirname, '..', year)
  
  if(!year) {
    console.error('Please specify a year');
    return;
  }
  
  if(!day) {
    console.error('Please specify a day');
    return;
  }
  
  // Preparing folder structure
  try {
    console.log('Creating folder structure');
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    folderName = path.join(folderName, `day${day}`);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
  
  // Copy template file from src/template/solution.js to recently created folder
  try {
    console.log('Copying template file');
    fs.copyFileSync(path.join(__dirname, 'template.js'), path.join(folderName, 'index.js'));
  } catch (err) {
    console.error(err);
  }
  
  // Copy input data from AOC to recently created folder
  let url = `https://adventofcode.com/${year}/day/${day}/input`
  
  console.log(`Downloading input data from ${url}`)
  
  // Session cookie is required to download the input data
  const options = {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_COOKIE}`
    }
  }
  
  await https.get(url, options, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Error: ${res.statusCode}`);
      return;
    }
    
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    
    res.on('end', () => {
      fs.writeFileSync(path.join(folderName, 'input.txt'), data)
      console.log('Input data copied')
    });
  }).on('error', (err) => {
    console.error(`Error: ${err.message}`)
  })
  
}

module.exports = copyTemplate()