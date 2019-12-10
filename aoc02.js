const input = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 13, 1, 19, 1, 19, 6, 23, 1,
  23, 6, 27, 1, 13, 27, 31, 2, 13, 31, 35, 1, 5, 35, 39, 2, 39, 13, 43, 1, 10, 43, 47, 2, 13,
  47, 51, 1, 6, 51, 55, 2, 55, 13, 59, 1, 59, 10, 63, 1, 63, 10, 67, 2, 10, 67, 71, 1, 6, 71,
  75, 1, 10, 75, 79, 1, 79, 9, 83, 2, 83, 6, 87, 2, 87, 9, 91, 1, 5, 91, 95, 1, 6, 95, 99, 1,
  99, 9, 103, 2, 10, 103, 107, 1, 107, 6, 111, 2, 9, 111, 115, 1, 5, 115, 119, 1, 10, 119, 123,
  1, 2, 123, 127, 1, 127, 6, 0, 99, 2, 14, 0, 0];

function opcode(noun, verb) {
  let index = 0;
  const opcodeInput = [...input];

  opcodeInput[1] = noun;
  opcodeInput[2] = verb;

  while (true) {
    const opcode = opcodeInput[index];
    const a = opcodeInput[opcodeInput[index + 1]];
    const b = opcodeInput[opcodeInput[index + 2]];
    const pos = opcodeInput[index + 3];
  
    if (opcode === 99) {
      break;
    }
  
    opcodeInput[pos] = opcode === 1
      ? a + b
      : a * b;
    
    index += 4;
  }

  return opcodeInput[0];
}

for (n = 0; n < 100; n++) {
  for (v = 0; v < 100; v++) {
    if (opcode(n,v) === 19690720) {
      console.log(n, v);
    }
  }
}

console.log(opcode(12,2))
