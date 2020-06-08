function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let res = 20;
let rows;
let cols;
let play = false;
let fr = 10;

function setup() {
  createCanvas(1280, 1280);
  background(0);
  frameRate(fr);
  rows = height / res;
  cols = width / res;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Square(Boolean(Math.random() < 0.2), i, j);
    }
  }
}

function mouseClicked() {
  if (mouseX <= width && mouseY <= height) {
    let i = floor(mouseX / res);
    let j = floor(mouseY / res);
    grid[i][j].flip();
  }
}
function mouseDragged() {
  if (mouseX <= width && mouseY <= height) {
    let i = floor(mouseX / res);
    let j = floor(mouseY / res);
    grid[i][j].state = true;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && fr < 60) {
    fr += 1;
  } else if (keyCode === DOWN_ARROW && fr > 5) {
    fr -= 1;
  } else if (keyCode === 32) {
    play = !play;
  } else if (keyCode === 27) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Square(false, i, j);
      }
    }
    play = false;
  }
}

function draw() {
  background(0);
  frameRate(fr);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      if (grid[i][j].state) {
        fill(0, 255, 100);
        stroke(100);
        rect(x, y, res, res);
      } else {
        fill(0);
        stroke(100);
        rect(x, y, res - 1, res - 1);
      }
    }
  }
  if (play) {
    let next = make2DArray(cols, rows);
    // apply game logic on grid and fill next
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let count = grid[i][j].countN(grid);
        let state = grid[i][j].state;
        if (!state && count == 3) {
          next[i][j] = new Square(true, i, j);
          // console.log('born');
        } else if (state && (count < 2 || count > 3)) {
          next[i][j] = new Square(false, i, j);
          // console.log('dead');
        } else {
          next[i][j] = new Square(state, i, j);
          // console.log(state);
        }
      }
    }

    grid = next;
    delete next;
  }
}
