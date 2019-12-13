function run(program) {
  const { inputPhase, instructions } = program;

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
    program.relativeBase += read(v1);
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
      case 2 : return instructions[index] + program.relativeBase;
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

    const v1 = parameter(p1, program.index + 1);
    const v2 = parameter(p2, program.index + 2);
    const v3 = parameter(p3, program.index + 3);

    return codes[code](v1, v2, v3);
  }

  const jump = (number) => {
    program.index += number;
  }

  const go = (address) => {
    program.index = address;
  }

  while(true) {
    const result = execute(instructions[program.index]);

    if (result === false) {
      return { exitMode: 'final' };
    }
    if (result !== true) {
      return { exitMode: 'output', output: result };
    }
  };
}

module.exports = run;
