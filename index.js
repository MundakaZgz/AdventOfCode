
for(let year = 2022; year < new Date().getFullYear(); i++) {
  console.group(year)

  for(let day = 1; day < 25; day++) {
    console.group(day)
      //const challenge = require(`./${year}/day${day}/index.js`)
      //onsole.log(challenge)
    console.groupEnd()
  }

  console.groupEnd()
}