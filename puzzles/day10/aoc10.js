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
  const angle = Math.atan2((point1.y - point2.y), (point2.x - point1.x));

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
        totalViews: 0,
      };
    }
  }
}

const views = [];
const angles = [];
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
      asteroid.views[a] = [];
    }
  }

  asteroid.totalViews = Object.keys(asteroid.views).length;
  views.push(asteroid.totalViews);
}

// Phase 1
const maxViews = Math.max(...views);
console.log(maxViews);


// Phase 2
const laserAsteroid= asteroids[Object.keys(asteroids).find((key) => asteroids[key].totalViews === maxViews)];

laserAsteroid.maps.forEach((externalAsteroid) => {
  laserAsteroid.views[externalAsteroid.angle].push(externalAsteroid);
});

for (const [key, laserAngle] of Object.entries(laserAsteroid.views)) {
  laserAngle.sort((a, b) => a.distance - b.distance);
}

const anglesInOrder = Object.keys(laserAsteroid.views).map(Number).sort((a, b) => b - a);
const startAngleIndex = anglesInOrder.indexOf(Math.PI / 2);

const leftAngles = anglesInOrder.slice(0, startAngleIndex);
const rightAngles = anglesInOrder.slice(startAngleIndex);

const startShooting = [...rightAngles, ...leftAngles];

console.log(startShooting[199]);
console.log(laserAsteroid.views[startShooting[199]]);

// @Todo clean up this code

// console.log(angle({ x: 15, y: 15 }, { x: 15, y: 0 }));
// console.log(angle({ x: 15, y: 15 }, { x: 16, y: 0 }));
