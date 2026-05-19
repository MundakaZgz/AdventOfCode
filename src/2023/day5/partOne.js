const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getSeedsAndMaps(data) {
    let seeds = [];
    const seedsToSoilMap = [];
    const soilToFertilizerMap = [];
    const fertilizerToWaterMap = [];
    const waterToLightMap = [];
    const lightToTemperatureMap = [];
    const temperatureToHumidityMap = [];
    const humidityToLocationMap = [];

    const dataBlocks = [seedsToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap];
    let currentDataBlock = -1;

    for (let i = 0; i < data.length; i++) {
      const line = data[i];

      if (line.startsWith('seeds')) {
        const readingSeed = true;
        seeds = line.split(':')[1].trim().split(' ').map((x) => parseInt(x.trim()));
        continue;
      }

      if (line.startsWith('seed-to-soil') || line.startsWith('soil-to-fertilizer') || line.startsWith('fertilizer-to-water') || line.startsWith('water-to-light') || line.startsWith('light-to-temperature') || line.startsWith('temperature-to-humidity') || line.startsWith('humidity-to-location')) {
        currentDataBlock++;
        continue;
      }

      if (line.length === 0) {
        continue;
      }

      if (currentDataBlock >= 0) {
        const matches = line.split(' ');

        dataBlocks[currentDataBlock].push({
          destinationRangeStart: parseInt(matches[0]),
          sourceRangeStart: parseInt(matches[1]),
          rangeLength: parseInt(matches[2]),
        });
      }
    }

    return {
      seeds,
      seedsToSoilMap,
      soilToFertilizerMap,
      fertilizerToWaterMap,
      waterToLightMap,
      lightToTemperatureMap,
      temperatureToHumidityMap,
      humidityToLocationMap,
    };
  }

  function mapValueToTable(value, table) {
    for (let i = 0; i < table.length; i++) {
      const row = table[i];
      if (value >= row.sourceRangeStart && value < row.sourceRangeStart + row.rangeLength) {
        return row.destinationRangeStart + (value - row.sourceRangeStart);
      }
    }

    return value;
  }

  const main = () => {
    const data = getData();
    const seedAndMaps = getSeedsAndMaps(data);
    const { seeds } = seedAndMaps;
    const soil = seeds.map((x) => mapValueToTable(x, seedAndMaps.seedsToSoilMap));
    const fertilizer = soil.map((x) => mapValueToTable(x, seedAndMaps.soilToFertilizerMap));
    const water = fertilizer.map((x) => mapValueToTable(x, seedAndMaps.fertilizerToWaterMap));
    const light = water.map((x) => mapValueToTable(x, seedAndMaps.waterToLightMap));
    const temperature = light.map((x) => mapValueToTable(x, seedAndMaps.lightToTemperatureMap));
    const humidity = temperature.map((x) => mapValueToTable(x, seedAndMaps.temperatureToHumidityMap));
    const location = humidity.map((x) => mapValueToTable(x, seedAndMaps.humidityToLocationMap));

    console.log(`The lowest location is ${Math.min(...location)}`);
  };

  main();
};
