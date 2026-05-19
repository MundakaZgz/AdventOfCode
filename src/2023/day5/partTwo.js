const fs = require('fs');
const path = require('path');

module.exports = function () {
  function getData() {
    const textFilePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(textFilePath, 'utf8').split(/\r?\n/);
    return data;
  }

  function getSeedsAndMaps(data) {
    const seeds = [];
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
        const parsedSeeds = line.split(':')[1].trim().split(' ').map((x) => parseInt(x.trim()));
        for (let j = 0; j < parsedSeeds.length; j += 2) {
          seeds.push({
            seedStart: parsedSeeds[j],
            rangeLength: parsedSeeds[j + 1],
          });
        }
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

    let lowerLocation = Infinity;

    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      for (let j = seed.seedStart; j < seed.seedStart + seed.rangeLength; j++) {
        const soil = mapValueToTable(j, seedAndMaps.seedsToSoilMap);
        const fertilizer = mapValueToTable(soil, seedAndMaps.soilToFertilizerMap);
        const water = mapValueToTable(fertilizer, seedAndMaps.fertilizerToWaterMap);
        const light = mapValueToTable(water, seedAndMaps.waterToLightMap);
        const temperature = mapValueToTable(light, seedAndMaps.lightToTemperatureMap);
        const humidity = mapValueToTable(temperature, seedAndMaps.temperatureToHumidityMap);
        const location = mapValueToTable(humidity, seedAndMaps.humidityToLocationMap);
        if (location < lowerLocation) {
          lowerLocation = location;
        }
      }
    }

    console.log(`The lowest location is ${lowerLocation}`);
  };

  main();
};
