const instructionSet = [3,8,1001,8,10,8,105,1,0,0,21,42,67,88,101,114,195,276,357,438,99999,3,9,101,3,9,9,1002,9,4,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,2,9,9,102,2,9,9,1001,9,5,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,4,9,9,101,4,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99];
// const instructionSet = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

function run(amplificator, inputSignal) {
  const { inputPhase, instructions } = amplificator;

  function op01(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]
    const v3 = instructions[amplificator.index + 3];

    instructions[v3] = v1 + v2;
    amplificator.index += 4;

    return true;
  }
  function op02(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]
    const v3 = instructions[amplificator.index + 3]

    instructions[v3] = v1 * v2;

    amplificator.index += 4;

    return true;
  }
  function op03() {
    const input = ++amplificator.inputCall === 1 ? inputPhase : inputSignal;

    instructions[instructions[amplificator.index + 1]] = input;

    amplificator.index += 2;

    return true;
  }
  function op04() {  
    output = instructions[instructions[amplificator.index + 1]];
    amplificator.index += 2;

    return output;
  }
  function op05(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]

    if (v1) {
      amplificator.index = v2;
    } else {
      amplificator.index += 3;
    }

    return true;
  }
  function op06(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]

    if (!v1) {
      amplificator.index = v2;
    } else {
      amplificator.index += 3;
    }

    return true;
  }
  function op07(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]
    const v3 = instructions[amplificator.index + 3]

    instructions[v3] = v1 < v2 ? 1 : 0;

    amplificator.index += 4;

    return true;
  }
  function op08(p1, p2) {
    const v1 = p1 ? instructions[amplificator.index + 1] : instructions[instructions[amplificator.index + 1]]
    const v2 = p2 ? instructions[amplificator.index + 2] : instructions[instructions[amplificator.index + 2]]
    const v3 = instructions[amplificator.index + 3]

    instructions[v3] = v1 === v2 ? 1 : 0;

    amplificator.index += 4;

    return true;
  }
  function op99() {
    return false;
  }

  const codes = {
    1: op01,
    2: op02,
    3: op03,
    4: op04,
    5: op05,
    6: op06,
    7: op07,
    8: op08,
    99: op99,
  };

  function execute(opcode) {
    let code = opcode % 100;
    let p1 = ~~(opcode / 100) % 10;
    let p2 = ~~(opcode / 1000) % 10;

    return codes[code](p1, p2);
  }

  while(true) {
    const result = execute(instructions[amplificator.index]);

    if (result === false) {
      console.log('finalmode');
      return { exitMode: 'final' };
    }
    if (result !== true) {
      console.log('outputmode', result);
      return { exitMode: 'output', output: result };
    }
  };
}


const thrustValues = permutator([5,6,7,8,9]).map(permutation => {
// const thrustValues = [[9,8,7,6,5]].map(permutation => {

  let inputSignal = 0;
  permutation = permutation.map((value, i) => {
    const next = i === 4 ? 0 : i + 1;
    return { inputPhase: value, next, instructions: [...instructionSet], index: 0, inputCall: 0 };
  })

  let current = permutation[0];

  while (current.next !== null) {
    console.log('run with', current.value, inputSignal);
    const { exitMode, output } = run(current, inputSignal);

    inputSignal = output || inputSignal;

    current = permutation[current.next];

    if (exitMode === 'final') {
      permutation[0].next = null;
    }
  }

  console.log('total', inputSignal);
  console.log('');

  return inputSignal;
});

console.log('maxValue', Math.max.apply(null, thrustValues));









function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}