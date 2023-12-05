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
        let seedsToSoilMap = [];
        let soilToFertilizerMap = [];
        let fertilizerToWaterMap = [];
        let waterToLightMap = [];
        let lightToTemperatureMap = [];
        let temperatureToHumidityMap = [];
        let humidityToLocationMap = [];
        
        let dataBlocks = [seedsToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap];
        let currentDataBlock = -1;
        
        for (let i = 0; i < data.length; i++) {
            let line = data[i];
            
            if(line.startsWith('seeds')) {
                readingSeed = true;
                seeds = line.split(':')[1].trim().split(' ').map((x) => parseInt(x.trim()));
                continue;
            }
            
            if(line.startsWith('seed-to-soil') || line.startsWith('soil-to-fertilizer') || line.startsWith('fertilizer-to-water') || line.startsWith('water-to-light') || line.startsWith('light-to-temperature') || line.startsWith('temperature-to-humidity') || line.startsWith('humidity-to-location')) {
                currentDataBlock++;
                continue;
            }
            
            if(line.length === 0) {
                continue;
            }

            if(currentDataBlock >= 0) {
                let matches = line.split(' ');

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
            let row = table[i];
            if(value >= row.sourceRangeStart && value < row.sourceRangeStart + row.rangeLength) {
                return row.destinationRangeStart + (value - row.sourceRangeStart);
            }
        }

        return value;
    }
    
    const main = () => {
        let data = getData();
        let seedAndMaps = getSeedsAndMaps(data);
        let seeds = seedAndMaps.seeds;
        let soil = seeds.map((x) => mapValueToTable(x, seedAndMaps.seedsToSoilMap));
        let fertilizer = soil.map((x) => mapValueToTable(x, seedAndMaps.soilToFertilizerMap));
        let water = fertilizer.map((x) => mapValueToTable(x, seedAndMaps.fertilizerToWaterMap));
        let light = water.map((x) => mapValueToTable(x, seedAndMaps.waterToLightMap));
        let temperature = light.map((x) => mapValueToTable(x, seedAndMaps.lightToTemperatureMap));
        let humidity = temperature.map((x) => mapValueToTable(x, seedAndMaps.temperatureToHumidityMap));
        let location = humidity.map((x) => mapValueToTable(x, seedAndMaps.humidityToLocationMap));

        console.log(`The lowest location is ${Math.min(...location)}`);
    };
    
    main();
};

