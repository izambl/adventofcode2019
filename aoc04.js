const lb = 178416;
const up = 676461;
let count = 0;

for (let i = lb; i <= up; i++) {
  count += checkValidity(i);
}

console.log(count);

function checkValidity(number) {
  const s = [...number + ''].map(Number);
  let double = false;
  let increase = true;

  for (let i = 1; i < s.length; i++) {
    increase = increase && (s[i-1] <= s[i]);

    if (s[i] === s[i-1] && s[i] !== s[i+1] && s[i] !== s[i-2]) {
      double = true;
    }
  }

  return double && increase;
}
