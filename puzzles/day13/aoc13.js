const fs = require('fs');
const path = require('path');
const run = require('../../puzzles/utils/intCode');

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8');
const arcade = input.split(',').map(Number);
const game = [];

function draw(x, y, tile) {
  game[x] = game[x] || [];

  game[x][y] = tile === 2 ? 1 : 0;
}

const arcadeProgam = {
  relativeBase: 0,
  instructions: [...arcade],
  inputPhase: 0,
  index: 0,
};


while (true) {
  const x = run(arcadeProgam);

  if (x.exitMode === 'final') {
    break;
  }

  const y = run(arcadeProgam);
  const tile = run(arcadeProgam);

  draw(x.output, y.output, tile.output);
}

let c = 0;
for (let i = 0; i < game.length; i += 1) {
  for (let j = 0; j < game.length; j += 1) {
    if (game[i][j] === 1) {
      c += 1;
    }
  }
}
console.log('Phase 01:', c);
