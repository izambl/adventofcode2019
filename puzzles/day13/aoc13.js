const fs = require('fs');
const path = require('path');
const run = require('../../puzzles/utils/intCode');

const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8');
const arcade = input.split(',').map(Number);
const game = [];

function draw(x, y, tile) {
  game[x] = game[x] || [];

  game[x][y] = tile;
}

const arcadeProgam = {
  relativeBase: 0,
  instructions: [...arcade],
  inputPhase: 0,
  index: 0,
};


let countBlocks = 0;
while (true) {
  const x = run(arcadeProgam);

  if (x.exitMode === 'final') {
    break;
  }

  const y = run(arcadeProgam);
  const tile = run(arcadeProgam);

  draw(x.output, y.output, tile.output);
  countBlocks += tile.output === 2;
}

console.log('Phase 01:', countBlocks);
