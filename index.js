console.log("Minesweeper Game");

const playButtonEl = document.getElementById("playButton");
const homeContentEl = document.getElementById("homeContent");
const bombLeftEl = document.getElementById("bombLeft");
const stopwatchEl = document.getElementById("stopwatchEl");
const gameBoardEl = document.getElementById("gameBoard");

const IC_BOMB_PATH = "assets/img/ic_bomb.svg";

let isPlaying = false;
let difficulty = "easy";
let vGrid = 14;
let hGrid = 14;
let boxContent;
let bombCount = 25;

// // element testing
// bombLeftEl.innerText = 30;
// stopwatch.innerText = "01:24";
// homeContentEl.innerText = "test";

const generateRandomCoordinate = () => {
  let vLocation = Math.floor(Math.random() * vGrid);
  let hLocation = Math.floor(Math.random() * hGrid);

  if (vLocation == 0 && hLocation == 0) {
    return generateRandomCoordinate();
  }
  return [vLocation, hLocation];
};

const generateBombLocation = () => {
  let bombLocations = [];
  for (let i = 0; i < bombCount; i++) {
    bombLocations.push(generateRandomCoordinate());
  }
  return bombLocations;
};

const generateInitialBoard = () => {
  let boards = [];
  for (let i = 0; i < vGrid; i++) {
    let row = [];
    for (let j = 0; j < hGrid; j++) {
      row.push(0);
    }
    boards.push(row);
  }
  return boards;
};

const changePage = (mode) => {
  if (isPlaying) {
    homeContentEl.style.display = "none";
    gameBoardEl.style.display = "block";
  }
};

const placeBomb = (initialBoard, bombLocations) => {
  bombLocations.forEach((location) => {
    initialBoard[location[0]][location[1]] = -1;
  });
  return initialBoard;
};

const incrementNumber = (initialBoard, x, y) => {
  if (x - 1 != -1 && y - 1 != -1) {
    if (initialBoard[x - 1][y - 1] != -1) {
      initialBoard[x - 1][y - 1] += 1;
    }
  }
  if (x - 1 != -1) {
    if (initialBoard[x - 1][y] != -1) {
      initialBoard[x - 1][y] += 1;
    }
  }
  if (x - 1 != -1 && y + 1 != vGrid) {
    if (initialBoard[x - 1][y + 1] != -1) {
      initialBoard[x - 1][y + 1] += 1;
    }
  }
  if (x + 1 != hGrid && y - 1 != -1) {
    if (initialBoard[x + 1][y - 1] != -1) {
      initialBoard[x + 1][y - 1] += 1;
    }
  }
  if (x + 1 != hGrid) {
    if (initialBoard[x + 1][y] != -1) {
      initialBoard[x + 1][y] += 1;
    }
  }
  if (x + 1 != hGrid && y + 1 != vGrid) {
    if (initialBoard[x + 1][y + 1] != -1) {
      initialBoard[x + 1][y + 1] += 1;
    }
  }
  if (y - 1 != -1) {
    if (initialBoard[x][y - 1] != -1) {
      initialBoard[x][y - 1] += 1;
    }
  }
  if (y + 1 != vGrid) {
    if (initialBoard[x][y + 1] != -1) {
      initialBoard[x][y + 1] += 1;
    }
  }

  return initialBoard;
};

const placeNumber = (initialBoard, bombLocations) => {
  bombLocations.forEach((location) => {
    let x = parseInt(location[0]);
    let y = parseInt(location[1]);
    initialBoard[x][y] = -1;
    initialBoard = incrementNumber(initialBoard, x, y);
    console.log(initialBoard);
  });

  return initialBoard;
};

const processBox = (divBox, number, x, y) => {
  console.log(number);
  divBox.id = `${x}-${y}`;
  switch (number) {
    case -1:
      divBox.classList.add("isBomb");
      let imgBomb = document.createElement("img");
      imgBomb.src = IC_BOMB_PATH;
      imgBomb.alt = "B";
      divBox.appendChild(imgBomb);
      break;
    case 0:
      var p = document.createElement("p");
      divBox.appendChild(p);
      break;
    case 1:
      var p = document.createElement("p");
      p.innerText = 1;
      divBox.appendChild(p);
      divBox.classList.add("isOne");
      break;
    case 2:
      var p = document.createElement("p");
      p.innerText = 2;
      divBox.appendChild(p);
      divBox.classList.add("isTwo");
      break;
    case 3:
      var p = document.createElement("p");
      p.innerText = 3;
      divBox.appendChild(p);
      divBox.classList.add("isThree");
      break;
    case 4:
      var p = document.createElement("p");
      p.innerText = 4;
      divBox.appendChild(p);
      divBox.classList.add("isFour");
      break;
    case 5:
      var p = document.createElement("p");
      p.innerText = 5;
      divBox.appendChild(p);
      divBox.classList.add("isFive");
      break;
    case 6:
      var p = document.createElement("p");
      p.innerText = 6;
      divBox.appendChild(p);
      divBox.classList.add("isSix");
      break;
    case 7:
      var p = document.createElement("p");
      p.innerText = 7;
      divBox.appendChild(p);
      divBox.classList.add("isSeven");
      break;
  }
  return divBox;
};

const setupBoxes = (numberedBoard) => {
  // gameBoardEl;
  for (let i = 0; i < vGrid; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < hGrid; j++) {
      let number = numberedBoard[i][j];

      let divBox = document.createElement("div");
      divBox.classList.add("box");

      divBox = processBox(divBox, number, i, j);

      divRow.appendChild(divBox);
    }
    gameBoardEl.appendChild(divRow);
  }
};

const setupGame = () => {
  let initialBoard = generateInitialBoard();
  let bombLocations = generateBombLocation();
  console.log(bombLocations);
  let numberedBoard = placeNumber(initialBoard, bombLocations);
  setupBoxes(numberedBoard);

  //   console.log(numberedBoard);
};

const handleBoxClick = (box) => {
  let thisId = box.id;
  let thisEl = document.getElementById(thisId);
  //   console.log(document.getElementById(thisId).firstChild);
  thisEl.firstChild.style.display = "flex";
  thisEl.style.backgroundColor = "rgba(230,230,230,1)";
  //   if (thisEl)
  console.log(thisId);
};

const handleBoxDoubleClick = (box) => {
  let thisId = box.id;
  let thisEl = document.getElementById(thisId);
  thisEl.firstChild.style.display = "flex";
  thisEl.style.backgroundColor = "rgba(0,0,0,1)";
};

// const handleBoxEvent = (box) => {
//   let t1, t2;
//   box.addEventListener("keydown", () => {
//     t1 = Date.now();

//     box.addEventListener("keyup", () => {
//       t2 = Date.now();
//       console.log(t2 - t1);
//     });
//   });

//   //   console.log(t2 - t1);
// };

const setupEvents = () => {
  //   boxes[0].style.display = "flex";
  //   console.log(boxes[0].id);
  let boxes = document.querySelectorAll(".box");
  //   boxes = [1, 2, 3, 4];
  //   boxes.forEach(console.log("a"));
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      handleBoxClick(box);
    });
    box.addEventListener("dblclick", () => {
      handleBoxDoubleClick(box);
    });
  });
};

const gamePlay = () => {};

const startGame = () => {
  console.log("game started");
  isPlaying = true;
  setupGame();
  changePage(1);
  setupEvents();
  gamePlay();
};

playButtonEl.addEventListener("click", startGame);
