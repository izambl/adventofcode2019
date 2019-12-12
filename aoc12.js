const moons = [
  { name: 'Io',       pos: { x: -17, y: 9,  z: -5 }, vel: { x: 0, y: 0, z: 0 }},
  { name: 'Europa',   pos: { x: -1,  y: 7,  z: 13 }, vel: { x: 0, y: 0, z: 0 }},
  { name: 'Ganymede', pos: { x: -19, y: 12, z: 5 },  vel: { x: 0, y: 0, z: 0 }},
  { name: 'Callisto', pos: { x: -6,  y: -6, z: -4 }, vel: { x: 0, y: 0, z: 0 }},
];
const moonsPhase2 = [
  { name: 'Io',       pos: { x: -17, y: 9,  z: -5 }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -17, y: 9,  z: -5 } },
  { name: 'Europa',   pos: { x: -1,  y: 7,  z: 13 }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -1,  y: 7,  z: 13 } },
  { name: 'Ganymede', pos: { x: -19, y: 12, z: 5  }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -19, y: 12, z: 5  } },
  { name: 'Callisto', pos: { x: -6,  y: -6, z: -4 }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -6,  y: -6, z: -4 } },
];
const demoMoons = [
  { name: 'Io',       pos: { x: -1, y: 0,   z: 2  }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -1, y: 0,   z: 2  } },
  { name: 'Europa',   pos: { x: 2,  y: -10, z: -7 }, vel: { x: 0, y: 0, z: 0 }, ori: { x: 2,  y: -10, z: -7 } },
  { name: 'Ganymede', pos: { x: 4,  y: -8,  z: 8  }, vel: { x: 0, y: 0, z: 0 }, ori: { x: 4,  y: -8,  z: 8  } },
  { name: 'Callisto', pos: { x: 3,  y: 5,   z: -1 }, vel: { x: 0, y: 0, z: 0 }, ori: { x: 3,  y: 5,   z: -1 } },
];
const demoMoons2 = [
  { name: 'Io',       pos: { x: -8, y: -10, z: 0   }, vel: { x: 0, y: 0, z: 0 }, ori: { x: -8, y: -10, z: 0   } },
  { name: 'Europa',   pos: { x: 5,  y: 5,   z: 10  }, vel: { x: 0, y: 0, z: 0 }, ori: { x: 5,  y: 5,   z: 10  } },
  { name: 'Ganymede', pos: { x: 2,  y: -7,  z: 3   }, vel: { x: 0, y: 0, z: 0 }, ori: { x: 2,  y: -7,  z: 3   } },
  { name: 'Callisto', pos: { x: 9,  y: -8,  z: -3 },  vel: { x: 0, y: 0, z: 0 }, ori: { x: 9,  y: -8,  z: -3  } },
];


const relativePull = (pos1, pos2) => pos1 < pos2 ? 1 : pos1 > pos2 ? -1 : 0;

function applyGravity(moons) {
  for (let i = 0; i < moons.length; i++) {
    for (let j = 0; j < moons.length; j++) {
      if (moons[i] !== moons[j]) {
        moons[i].vel.x += relativePull(moons[i].pos.x, moons[j].pos.x);
        moons[i].vel.y += relativePull(moons[i].pos.y, moons[j].pos.y);
        moons[i].vel.z += relativePull(moons[i].pos.z, moons[j].pos.z);
      }
    }
  }
}
function applyVelocity(moon) {
  moon.pos.x += moon.vel.x;
  moon.pos.y += moon.vel.y;
  moon.pos.z += moon.vel.z;
}
function totalEnergy(moon) {
  const potential = Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z);
  const kinetic = Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z);

  return potential * kinetic;
}

// Phase 01

console.time('day12 phase 1');
let steps = 1000;
while(steps--) {
  applyGravity(moons);
  applyVelocity(moons[0]);
  applyVelocity(moons[1]);
  applyVelocity(moons[2]);
  applyVelocity(moons[3]);
}
console.timeEnd('day12 phase 1');

const totalSystemEnergy = moons.reduce((a, moon) => a + totalEnergy(moon), 0);
console.log('Phase 01, total system energy:', totalSystemEnergy);

// Phase 2 - Brute force
function originalPosition(moons, currentStep) {
  let xEqual = true;
  let yEqual = true;
  let zEqual = true;

  for (let i = 0; i < moons.length; i++) {
    const moon = moons[i];

    xEqual = xEqual && ((moon.pos.x == moon.ori.x) && (moon.vel.x == 0));
    yEqual = yEqual && ((moon.pos.y == moon.ori.y) && (moon.vel.y == 0));
    zEqual = zEqual && ((moon.pos.z == moon.ori.z) && (moon.vel.z == 0));
  }

  xEqual && xPhases.push(currentStep)
  yEqual && yPhases.push(currentStep)
  zEqual && zPhases.push(currentStep)
}

console.time('day12 phase 2');
let currentStep = 0;
const moonsToTest = moonsPhase2;
const xPhases = [];
const yPhases = [];
const zPhases = [];
let coutdown = 1000000000;
while(coutdown--) {
  applyGravity(moonsToTest);
  applyVelocity(moonsToTest[0]);
  applyVelocity(moonsToTest[1]);
  applyVelocity(moonsToTest[2]);
  applyVelocity(moonsToTest[3]);
  
  currentStep++;
  if (originalPosition(moonsToTest, currentStep)) {
    //break;
  }
}
console.timeEnd('day12 phase 2');

console.log(xPhases);
console.log(yPhases);
console.log(zPhases);

// Got differences from phases and then got LCM
// Used LCM from https://www.calculatorsoup.com/calculators/math/lcm.php

console.log('Phase 02, steps to original position:', currentStep);
