function run(amplificator) {
  const { inputPhase, instructions } = amplificator;

  const op01 = (v1, v2, v3) => {
    write(v3, read(v1) + read(v2));
    jump(4);

    return true;
  }
  const op02 = (v1, v2, v3) => {
    write(v3, read(v1) * read(v2));
    jump(4);

    return true;
  }
  const op03 = (v1) => {
    write(v1, inputPhase);
    jump(2);

    return true;
  }
  const op04 = (v1) => {  
    const output = read(v1);
    jump(2);

    return output;
  }
  const op05 = (v1, v2) => {
    if (read(v1) !== 0) {
      go(read(v2));
    } else {
      jump(3);
    }

    return true;
  }
  const op06 = (v1, v2) => {
    if (read(v1) === 0) {
      go(read(v2));
    }
    else {
      jump(3);
    }

    return true;
  }
  const op07 = (v1, v2, v3) => {
    write(v3, read(v1) < read(v2) ? 1 : 0);
    jump(4);

    return true;
  }
  const op08 = (v1, v2, v3) => {
    write(v3, read(v1) === read(v2) ? 1 : 0);
    jump(4);

    return true;
  }
  const op09 = (v1) => {
    amplificator.relativeBase += read(v1);
    jump(2);
    
    return true;
  }
  const op99 = () => false;

  const codes = {
    1: op01,
    2: op02,
    3: op03,
    4: op04,
    5: op05,
    6: op06,
    7: op07,
    8: op08,
    9: op09,
    99: op99,
  };

  const parameter = (mode, index) => {
    switch (mode) {
      case 0 : return instructions[index];
      case 1 : return index;
      case 2 : return instructions[index] + amplificator.relativeBase;
    }
  }

  const read = (index) => {
    return instructions[index] || 0;
  }

  const write = (index, value) => {
    instructions[index] = value;
  }

  const execute = (opcode) => {
    const code = opcode % 100;
    const p1 = ~~(opcode / 100) % 10;
    const p2 = ~~(opcode / 1000) % 10;
    const p3 = ~~(opcode / 10000) % 10;

    const v1 = parameter(p1, amplificator.index + 1);
    const v2 = parameter(p2, amplificator.index + 2);
    const v3 = parameter(p3, amplificator.index + 3);

    return codes[code](v1, v2, v3);
  }

  const jump = (number) => {
    amplificator.index += number;
  }

  const go = (address) => {
    amplificator.index = address;
  }

  while(true) {
    const result = execute(instructions[amplificator.index]);

    if (result === false) {
      return { exitMode: 'final' };
    }
    if (result !== true) {
      return { exitMode: 'output', output: result };
    }
  };
}

const paintCode = [3,8,1005,8,318,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,29,1006,0,99,1006,0,81,1006,0,29,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,59,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,102,1,8,82,1,1103,3,10,2,104,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,111,1,108,2,10,2,1101,7,10,1,1,8,10,1,1009,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,149,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,172,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,193,1006,0,39,2,103,4,10,2,1103,20,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,227,1,1106,8,10,2,109,15,10,2,106,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,261,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,283,1,1109,9,10,2,1109,5,10,2,1,2,10,1006,0,79,101,1,9,9,1007,9,1087,10,1005,10,15,99,109,640,104,0,104,1,21101,936333124392,0,1,21101,0,335,0,1106,0,439,21102,1,824663880596,1,21102,346,1,0,1105,1,439,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,179519553539,1,21101,393,0,0,1106,0,439,21102,46266515623,1,1,21101,0,404,0,1106,0,439,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,983925826324,1,21101,0,427,0,1106,0,439,21101,988220642048,0,1,21102,1,438,0,1105,1,439,99,109,2,21201,-1,0,1,21102,1,40,2,21101,0,470,3,21101,460,0,0,1106,0,503,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,465,466,481,4,0,1001,465,1,465,108,4,465,10,1006,10,497,1101,0,0,465,109,-2,2106,0,0,0,109,4,2102,1,-1,502,1207,-3,0,10,1006,10,520,21101,0,0,-3,22102,1,-3,1,21202,-2,1,2,21102,1,1,3,21102,1,539,0,1105,1,544,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,567,2207,-4,-2,10,1006,10,567,21202,-4,1,-4,1106,0,635,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,1,586,0,1105,1,544,21202,1,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,605,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,627,21202,-1,1,1,21102,1,627,0,105,1,502,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0];

const paintProgram = {
  relativeBase: 0,
  instructions: [...paintCode],
  inputPhase: 1, // 0 for phase1, 1 for phase 2
  index: 0,
}; 

let x = 0;
let y = 0;
let direction = 1; // 1=up 2=right 3=down 4=left
const panels = {};
let paintOrMove = true; // true=paint, false=move

const results = [];

const turn = (t) => {
  if (t === 1) {
    direction += 1;
    if (direction === 5) {
      direction = 1;
    }
  }
  else {
    direction -= 1;
    if (direction === 0) {
      direction = 4;
    }
  }
}
const paint = (color) => {
  panels[`X${x}Y${y}`] = { color, point: { x, y } };
}
const move = () => {
  switch(direction) {
    case 1: y -= 1; break;
    case 2: x += 1; break;
    case 3: y += 1; break;
    case 4: x -= 1; break;
  }
  paintProgram.inputPhase = panels[`X${x}Y${y}`] || 0;
}

while (true) {
  const result = run(paintProgram);
  
  if (result.exitMode === 'final') {
    break;
  }

  if (paintOrMove) {
    paint(result.output);
  } else {
    turn(result.output);
    move();
  }
  paintOrMove = !paintOrMove;
}

// Phase 1
console.log(Object.keys(panels).length);


//Phase 2
const plate = [];

for(panel in panels) {
  const x = panels[panel].point.x;
  const y = panels[panel].point.y;

  plate[x] = plate[x] || [];

  plate[x][y] = panels[panel].color ? '█' : ' ';
}

plate.forEach(line => console.log(line.reverse().join('')));

   
// ██████
// █  █ █
// █  █ █
//  ██ █ 
      
//  █    
// █     
// █    █
//  █████
      
// ██████
//   █  █
//  ██  █
// █  ██ 
      
// ██████
//    █  
//  ██ █ 
// █    █
      
// ██████
// █     
// █     
// █     
      
//  █    
// █     
// █    █
//  █████
      
//  █████
// █     
// █     
//  █████
      
// ██████
//   █  █
//   █  █
//    ██ 