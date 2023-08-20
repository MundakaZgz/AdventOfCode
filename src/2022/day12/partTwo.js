const fs = require('fs');
const path = require('path');

module.exports = function () {
  const textFilePath = path.join(__dirname, 'input.txt');

  const getInput = () => {
    const data = fs.readFileSync(textFilePath, 'utf-8')
      .split(/\r?\n/);

    const field = {
      start: {},
      end: {},
    };

    field.map = data.map((line, y) => [...line].map((value, x) => {
      if (value === 'S') {
        field.start = { y, x };
        return 0;
      }
      if (value === 'E') {
        field.end = { y, x };
        return 25;
      }
      return value.charCodeAt(0) - 'a'.charCodeAt(0);
    }));

    return field;
  };

  function pointToInt(x, y) {
    return y * 1e3 + x;
  }

  function intToPoint(int) {
    return {
      y: Math.floor(int / 1e3),
      x: int % 1e3,
    };
  }

  function getNeighbors(x, y, map) {
    const res = [];
    const currentHeight = map[y][x] - 1;
    if (y + 1 < map.length && map[y + 1][x] >= currentHeight) {
      res.push(pointToInt(x, y + 1));
    }
    if (y - 1 >= 0 && map[y - 1][x] >= currentHeight) {
      res.push(pointToInt(x, y - 1));
    }
    if (x + 1 < map[y].length && map[y][x + 1] >= currentHeight) {
      res.push(pointToInt(x + 1, y));
    }
    if (x - 1 >= 0 && map[y][x - 1] >= currentHeight) {
      res.push(pointToInt(x - 1, y));
    }
    return res;
  }

  function dijkstra(map, start) {
    const dist = {};
    const prev = {};
    let queue = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const id = pointToInt(x, y);
        dist[id] = Infinity;
        // prev[id] = undefined;
        queue.push(id);
      }
    }
    dist[pointToInt(start.x, start.y)] = 0;

    while (queue.length) {
      let u = null;
      for (const current of queue) {
        if (u === null || dist[current] < dist[u]) {
          u = current;
        }
      }

      const point = intToPoint(u);
      if (map[point.y][point.x] === 0) {
          return dist[u];
      }

      queue = queue.filter((x) => x !== u);
      
      const neighbors = getNeighbors(point.x, point.y, map);

      for (const v of neighbors) {
        if (queue.includes(v)) {
          const alt = dist[u] + 1;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      }
    }

  }

  const main = () => {
    const input = getInput();
    const distance = dijkstra(input.map, input.end);
    console.log(`The distance is ${distance}`);
  };

  main();
};
