for (let year = 2022; year < new Date().getFullYear(); year++) {
  console.group(year);

  for (let day = 1; day < 3; day++) {
    console.group(day);
    const challenge = require(`./src/${year}/day${day}/index.js`);
    challenge();
    console.groupEnd();
  }

  console.groupEnd();
}
