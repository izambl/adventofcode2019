function run(inputPhase, inputSignal) {
  let output = null;
  let inputCall = 0;
  let index = 0;
  const instructions = [3,8,1001,8,10,8,105,1,0,0,21,42,67,88,101,114,195,276,357,438,99999,3,9,101,3,9,9,1002,9,4,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,2,9,9,102,2,9,9,1001,9,5,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,4,9,9,101,4,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99];


  function op01(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]
    const v3 = instructions[index + 3];

    instructions[v3] = v1 + v2;

    console.log('sum', v1, v2, 'in', v3);

    index += 4;

    return true;
  }
  function op02(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]
    const v3 = instructions[index + 3]

    instructions[v3] = v1 * v2;

    console.log('mul', v1, v2, 'in', v3);

    index += 4;

    return true;
  }
  function op03() {
    const input = ++inputCall === 1 ? inputPhase : inputSignal;

    instructions[instructions[index + 1]] = input;

    console.log('input', input, 'in', instructions[index + 1]);

    index += 2;

    return true;
  }
  function op04() {  
    output = instructions[instructions[index + 1]];
    console.log(`output: ${output}`)
    index += 2;

    return true;
  }
  function op05(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]

    if (v1) {
      console.log('jumpiftrue', v1, v2)
      index = v2;
    } else {
      index += 3;
    }

    return true;
  }
  function op06(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]

    if (!v1) {
      console.log('jumpiffalse', v1, v2)
      index = v2;
    } else {
      index += 3;
    }

    return true;
  }
  function op07(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]
    const v3 = instructions[index + 3]

    instructions[v3] = v1 < v2 ? 1 : 0;

    console.log('lessthan', v1, v2, v3)

    index += 4;

    return true;
  }
  function op08(p1, p2) {
    const v1 = p1 ? instructions[index + 1] : instructions[instructions[index + 1]]
    const v2 = p2 ? instructions[index + 2] : instructions[instructions[index + 2]]
    const v3 = instructions[index + 3]

    instructions[v3] = v1 === v2 ? 1 : 0;

    console.log('equals', v1, v2, v3)

    index += 4;

    return true;
  }
  function op99() {
    console.log('final', output)
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

  while(execute(instructions[index]));

  console.log('fin');

  return output;
}

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


const thrustValues = permutator([0,1,2,3,4]).map(permutation => {
  let inputSignal = 0;

  permutation.forEach(inputPhase => {
    inputSignal = run(inputPhase, inputSignal)
  });

  console.log('total', inputSignal);
  console.log('');

  return inputSignal;
});

console.log('maxValue', Math.max.apply(null, thrustValues));
