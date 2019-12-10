const asteroidMap = [];

asteroidMap.push('.###..#######..####..##...#'.split(''));
asteroidMap.push('########.#.###...###.#....#'.split(''));
asteroidMap.push('###..#...#######...#..####.'.split(''));
asteroidMap.push('.##.#.....#....##.#.#.....#'.split(''));
asteroidMap.push('###.#######.###..##......#.'.split(''));
asteroidMap.push('#..###..###.##.#.#####....#'.split(''));
asteroidMap.push('#.##..###....#####...##.##.'.split(''));
asteroidMap.push('####.##..#...#####.#..###.#'.split(''));
asteroidMap.push('#..#....####.####.###.#.###'.split(''));
asteroidMap.push('#..#..#....###...#####..#..'.split(''));
asteroidMap.push('##...####.######....#.####.'.split(''));
asteroidMap.push('####.##...###.####..##....#'.split(''));
asteroidMap.push('#.#..#.###.#.##.####..#...#'.split(''));
asteroidMap.push('..##..##....#.#..##..#.#..#'.split(''));
asteroidMap.push('##.##.#..######.#..#..####.'.split(''));
asteroidMap.push('#.....#####.##........#####'.split(''));
asteroidMap.push('###.#.#######..#.#.##..#..#'.split(''));
asteroidMap.push('###...#..#.#..##.##..#####.'.split(''));
asteroidMap.push('.##.#..#...#####.###.##.##.'.split(''));
asteroidMap.push('...#.#.######.#####.#.####.'.split(''));
asteroidMap.push('#..##..###...###.#.#..#.#.#'.split(''));
asteroidMap.push('.#..#.#......#.###...###..#'.split(''));
asteroidMap.push('#.##.#.#..#.#......#..#..##'.split(''));
asteroidMap.push('.##.##.##.#...##.##.##.#..#'.split(''));
asteroidMap.push('#.###.#.#...##..#####.###.#'.split(''));
asteroidMap.push('#.####.#..#.#.##.######.#..'.split(''));
asteroidMap.push('.#.#####.##...#...#.##...#.'.split(''));

function angle(point1, point2) {
  const angle = Math.atan2((point2.y - point1.y), (point2.x - point1.x));

  return angle;
}
function distance(point1, point2) {
  const distance = Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2));

  return distance;
}

const asteroids = {};

for (let y = 0; y < asteroidMap.length; y++) {
  for (let x = 0; x < asteroidMap[0].length; x++) {
    if (asteroidMap[y][x] === '#') {
      asteroids[`X${x}Y${y}`] = {
        key: `X${x}Y${y}`,
        point: { x, y },
        maps: [],
        views: {},
      };
    }
  }
}

const views = [];
for (const [key, asteroid] of Object.entries(asteroids)) {
  fillAdjacents(asteroid, views);
}

function fillAdjacents(asteroid, views) {
  for (const [key, localAsteroid] of Object.entries(asteroids)) {
    if (localAsteroid.key !== asteroid.key) {
      const d = distance(asteroid.point, localAsteroid.point);
      const a = angle(asteroid.point, localAsteroid.point);

      asteroid.maps.push({
        key: localAsteroid.key,
        angle: a,
        distance: d,
      });
      asteroid.views[a] = true;
    }
  }

  views.push(Object.keys(asteroid.views).length);
}

console.log(Math.max(...views));
