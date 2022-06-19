const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const n = +input[0];
const candy = input.slice(1).map((v) => v.split(""));

function swap(i, j, k) {
  const coord = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const here = candy[i][j];
  if (
    candy[i + coord[k][0]] &&
    candy[i + coord[k][0]][j + coord[k][1]] &&
    here !== candy[i + coord[k][0]][j + coord[k][1]]
  ) {
    candy[i][j] = candy[i + coord[k][0]][j + coord[k][1]];
    candy[i + coord[k][0]][j + coord[k][1]] = here;
    return true;
  } else return false;
}

function search() {
  for (let l = 0; l < 2; l++) {
    for (let x = 0; x < n; x++) {
      let count = 0;
      let color = curCandy(x, 0, l);
      for (let y = 0; y < n; y++) {
        if (curCandy(x, y, l) === color) {
          count++;
          if (count > maxCount) {
            maxCount = count;
          }
        } else {
          color = curCandy(x, y, l);
          count = 1;
        }
      }
    }
  }
}

function curCandy(x, y, l) {
  if (l === 0) return candy[x][y];
  else return candy[y][x];
}

let maxCount = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < 4; k++) {
      if (swap(i, j, k)) {
        search();
        swap(i, j, k);
      }
    }
  }
}

console.log(maxCount);
