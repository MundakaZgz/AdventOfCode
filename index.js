for (let year = 2022; year < new Date().getFullYear(); year++) {
  console.group(year);

  for (let day = 1; day < 25; day++) {
    console.group(`Day ${day}`);
    const challenge = require(`./src/${year}/day${day}/index.js`);
    if (typeof challenge === 'function') {
      challenge();
    }

    console.groupEnd();
  }

  console.groupEnd();
}
