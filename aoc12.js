const moons = [
  { name: 'Io',       pos: { x: -17, y: 9,  z: -5 }, vel: { x: 0, y: 0, z: 0 }, next: 1, prev: 3 },
  { name: 'Europa',   pos: { x: -1,  y: 7,  z: 13 }, vel: { x: 0, y: 0, z: 0 }, next: 2, prev: 0 },
  { name: 'Ganymede', pos: { x: -19, y: 12, z: 5 },  vel: { x: 0, y: 0, z: 0 }, next: 3, prev: 1 },
  { name: 'Callisto', pos: { x: -6,  y: -6, z: -4 }, vel: { x: 0, y: 0, z: 0 }, next: 0, prev: 2 },
];

function relativePull(pos1, pos2) {
  if (pos1 < pos2) {
    return 1;
  }
  if (pos1 > pos2) {
    return -1;
  }
  return 0;
}

function applyGravity(moons) {
  moons.forEach(moon => {
    moons.forEach(otherMoon => {
      if (moon !== otherMoon) {
        moon.vel.x += relativePull(moon.pos.x, otherMoon.pos.x);
        moon.vel.y += relativePull(moon.pos.y, otherMoon.pos.y);
        moon.vel.z += relativePull(moon.pos.z, otherMoon.pos.z);
      }
    });
  });
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
let steps = 1000;
while(steps--) {
  applyGravity(moons);
  moons.forEach(moon => applyVelocity(moon));
}

const totalSystemEnergy = moons.reduce((a, moon) => a + totalEnergy(moon), 0);
console.log('Phase 01, total system energy:', totalSystemEnergy)
