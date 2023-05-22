// const flagSymb = '&#128681;';
const popup = document.createElement('DIV');
popup.classList.add('popup');
document.body.appendChild(popup);

const modal = document.createElement('DIV');
modal.classList.add('modal');
popup.appendChild(modal);
const info = document.createElement('DIV');
info.classList.add('information');
modal.appendChild(info);
const close = document.createElement('DIV');
close.classList.add('close');
modal.appendChild(close);
close.innerHTML = 'Закрыть';

const headerName = document.createElement('H1');
headerName.classList.add('name');
document.body.appendChild(headerName);
headerName.textContent = 'Minsweeper';

const rules = document.createElement('BUTTON');
rules.classList.add('rule');
document.body.appendChild(rules);
rules.textContent = 'Правила игры';

const paragrRule = document.createElement('DIV');
paragrRule.classList.add('paragrRule');
document.body.appendChild(paragrRule);
paragrRule.textContent = 'В игре установлено 10 мин.';
paragrRule.textContent += ' При подозрении, что в ячейке находится мина, можно установить флажок ПКМ.';
paragrRule.textContent += ' Снятие флажка так же осуществляется ПКМ.';
paragrRule.textContent += ' Чтобы начать новую игру - нужно нажать на смайл.';
paragrRule.textContent += ' Победой считается открытие всех незаминированных ячеек.';
paragrRule.textContent += ' Проигрышем - открытие хотя бы одной мины.';

rules.addEventListener('click', () => {
  if (paragrRule.style.display === 'block') {
    paragrRule.style.display = 'none';
  } else {
    paragrRule.style.display = 'block';
  }
})

const totalArea = document.createElement('DIV');
totalArea.classList.add('total');
document.body.appendChild(totalArea);

const smile = document.createElement('BUTTON');
smile.classList.add('smile');
totalArea.appendChild(smile);
smile.innerHTML = '&#129488;';

const flag = document.createElement('DIV');
flag.classList.add('flag');
totalArea.appendChild(flag);
flag.innerHTML = 10;

const clicks = document.createElement('DIV');
clicks.classList.add('clicks');
totalArea.appendChild(clicks);
clicks.innerHTML = 0;



close.addEventListener('click', () => {
  popup.style.display = 'none';
  document.body.style.overflow = '';
  smile.disabled = false;
  popup.style.zIndex = '-100';
});
// ===========audio========
function soundClick(src) {
  const audio = new Audio();
  audio.src = src;
  audio.autoplay = true;
}
const audi = document.createElement('audio');
audi.src = 'audio/start.mp3';
document.body.appendChild(audi);
let src = 'audio/start.mp3';
soundClick(src);

const stopwatch = document.createElement('DIV');
stopwatch.classList.add('timer');
stopwatch.id = 'time';
totalArea.appendChild(stopwatch);
const minute = document.createElement('SPAN');
minute.classList.add('minute');
minute.id = 'minute';
stopwatch.appendChild(minute);
minute.innerHTML = '00';
const colon = document.createElement('SPAN');
colon.classList.add('colon');
stopwatch.appendChild(colon);
colon.innerHTML = ':';

const second = document.createElement('SPAN');
second.classList.add('second');
second.id = 'second';
stopwatch.appendChild(second);
second.innerHTML = '00';

const mineArea = document.createElement('DIV');
mineArea.classList.add('area');
document.body.appendChild(mineArea);

const quantity = 100;
for (let i = 1; i <= quantity; i++) {
  const cell = document.createElement('BUTTON');
  cell.classList.add('btn');
  mineArea.appendChild(cell);
}
let timer = 0;
if (localStorage.getItem('second').length > 0) {
  timer = Number(localStorage.getItem('second'));
  if (localStorage.getItem('second').length === 1) {
    const se = localStorage.getItem('second');
    second.innerHTML = `0${se.toString()}`;
    console.log(se, 'se');
  } else {
    second.innerHTML = localStorage.getItem('second');
  }
  minute.innerHTML = localStorage.getItem('minute');
}

let timerInterval;
let ms = 0;
let sec = document.getElementById('second');
let min = document.getElementById('minute');
let startGame = false;
function startGameTimer() {
  stopGame();
  timerInterval = setInterval(() => {
    timer += 1 / 60;
    const msF = Math.floor((timer - Math.floor(timer)) * 100);
    const secondF = Math.floor(timer) - Math.floor(timer / 60) * 60;
    const minuteF = Math.floor(timer / 60);
    if (msF < 10) {
      ms = `0${secondF.toString()}`;
    } else {
      ms = msF;
    }
    if (secondF < 10) {
      second.innerHTML = `0${secondF.toString()}`;
    } else {
      second.innerHTML = secondF;
    }
    if (minuteF < 10) {
      minute.innerHTML = `0${minuteF.toString()}`;
    } else {
      minute.innerHTML = minuteF;
    }
  }, 1000 / 60);
  startGame = true;
}

function stopGame() {
  clearInterval(timerInterval);
}

let bombIsReady = false;
function getRandomNumbers(bom, range, z) {
  const numbers = [];
  while (numbers.length < bom) {
    const randomNumber = Math.floor(Math.random() * range);
    if (!numbers.includes(randomNumber) && !numbers.includes(z)) {
      numbers.push(randomNumber);
    }
  }
  bombIsReady = true;
  return numbers;
}

const buttons = document.getElementsByClassName('btn');
const mineAreaDom = document.querySelector('.area');

// =========Координаты======
for (let i = 0; i < buttons.length; i++) {
  const x = Math.floor(i / 10) + 1;
  const y = (i % 10) + 1;
  buttons[i].dataset.coordinates = `${x}:${y}`;
}
let countOpenCells = [];
let bomb = [];
let countClick = 0;
let disabledArrey = [];
let stateCells = [];

let historyGame = false;
const children = Array.from(mineAreaDom.children);

function localStorageFunc() {
  if (localStorage.getItem('bombArrey') !== '') {
    bombIsReady = true;
    bomb = localStorage.getItem('bombArrey').split(',');
    const inner = localStorage.getItem('inner').split(',');
    let dis = localStorage.getItem('disabled').split(',');

    dis = dis.map((el) => Number(el));
    const obj = dis.reduce((object, key, index) => {
      object[key] = inner[index];
      return object;
    }, {});
    const keys = Object.keys(obj);
    for (const i of keys) {
      if (i < mineAreaDom.children.length) {
        mineAreaDom.children[i].disabled = true;
        mineAreaDom.children[i].innerHTML = obj[i];
      }
    }
    startGame = false;
  }
  let flagS = localStorage.getItem('flag').split(',');
  flagS = flagS.filter((number) => number !== '');
  flagS = flagS.map((el) => Number(el));
  if (flagS) {
    for (const el of flagS) {
      mineAreaDom.children[el].innerHTML = '🚩';
      mineAreaDom.children[el].disabled = true;
    }
  }
  flag.innerHTML = localStorage.getItem('flagCount');
  const color = localStorage.getItem('colorCount').match(/rgb\(\d+,\s*\d+,\s*\d+\)/g);
  for (let i = 0; i < color.length; i++) {
    children[i].style.color = color[i];
  }
  countClick = localStorage.getItem('countClick');
  clicks.innerHTML = countClick;
  historyGame = true;
}

if (!historyGame) {
  localStorageFunc();
}

function myFunction() {
  const timeW = Number(second.innerHTML) + Number(minute.innerHTML) * 60;
  localStorage.setItem('second', timeW.toString());
  localStorage.setItem('minute', minute.innerHTML);
}
setInterval(myFunction, 1000);

function stopFunction() {
  clearInterval(setInterval(myFunction, 1000));
}

function winLose() {
  countOpenCells = [];
  localStorage.setItem('countOpenCells', countOpenCells.toString());
  disabledArrey = [];
  localStorage.setItem('disabled', disabledArrey.toString());
  stateCells = [];
  localStorage.setItem('inner', stateCells.toString());
  const flagSet = [];
  localStorage.setItem('flag', flagSet.toString());
  flag.innerHTML = 10;
  second.innerHTML = '00';
  minute.innerHTML = '00';
  localStorage.setItem('flagCount', flag.innerHTML.toString());
  stopFunction();
  timer = 0;
  localStorage.setItem('second', timer.toString());
  localStorage.setItem('minute', '00');
  startGame = false;
  countClick = 0;
  localStorage.setItem('countClick', countClick.toString());
}

function win() {
  smile.innerHTML = '&#128526;';
  src = 'audio/win.mp3';
  soundClick(src);
  const timeW = Number(second.innerHTML) + Number(minute.innerHTML) * 60;
  info.innerHTML = `Вы выиграли. <br/>Ходов - ${countClick}. <br/>Время игры - ${timeW} сек.`;
  popup.style.display = 'block';
  popup.style.zIndex = '0';
  mineAreaDom.disabled = true;
  document.body.style.overflow = 'hidden';
  smile.disabled = true;
  localStorage.setItem('bombArrey', '');
}

function loose() {
  src = 'audio/lose.mp3';
  soundClick(src);
  const time = Number(second.innerHTML) + Number(minute.innerHTML) * 60;
  smile.innerHTML = '&#128561;';
  info.innerHTML = `Вы проиграли. <br/>Ходов - ${countClick}. <br/>Время игры - ${time} сек.`;
  popup.style.display = 'block';
  mineAreaDom.disabled = true;
  document.body.style.overflow = 'hidden';
  smile.disabled = true;
  popup.style.zIndex = '0';
  localStorage.setItem('bombArrey', '');
}
mineAreaDom.addEventListener('click', (event) => {
  event.stopPropagation();
  src = 'audio/click.mp3';
  soundClick(src);
  if (event.target) {
    countClick++;
    localStorage.setItem('countClick', countClick.toString());
    clicks.innerHTML = countClick;
  }
  if (!startGame) {
    startGameTimer();
  }
  const btnClass = event.target;
  const coordinate = btnClass.dataset.coordinates;
  const [x, y] = coordinate.split(':');
  const coorBtn = Number((y - 1) % 10) + Number((x - 1) * 10);
  if (!bombIsReady) {
    bomb = getRandomNumbers(10, quantity, coorBtn);
    localStorage.setItem('bombArrey', bomb.toString());
  } else {
    bomb = localStorage.getItem('bombArrey').split(',');
    bomb = bomb.map((el) => Number(el));
  }
  if (bomb.includes(coorBtn)) {
    event.target.innerHTML = '&#128163;';
    event.target.disabled = true;
    for (const mine of bomb) {
      mineAreaDom.children[mine].innerHTML = '&#128163;';
    }
    for (let i = 0; i < mineAreaDom.children.length; i++) {
      mineAreaDom.children[i].disabled = true;
    }
    stopGame();
    loose();
    winLose();
  } else if (count(x, y) === 0) {
    const zeros = countAllZeros(x, y);
    for (const i of zeros) {
      countOpenCells.push(i);
      disabledArrey.push(i);
      const сx = Math.floor(i / 10) + 1;
      const сy = i - Number((сx - 1) * 10) + 1;
      event.target.innerHTML = '';
      if (count(сx, сy) === 0) {
        mineAreaDom.children[i].innerHTML = '';
        stateCells.push(mineAreaDom.children[i].innerHTML);
        mineAreaDom.children[i].disabled = true;
        event.target.disabled = true;
      } else {
        mineAreaDom.children[i].innerHTML = count(сx, сy);
        mineAreaDom.children[i].disabled = true;
        event.target.disabled = true;
        stateCells.push(mineAreaDom.children[i].innerHTML);
      }
    }
  } else {
    event.target.innerHTML = count(x, y);
    stateCells.push(mineAreaDom.children[coorBtn].innerHTML);
    event.target.disabled = true;
    countOpenCells.push(coorBtn);
    disabledArrey.push(coorBtn);
  }
  if (localStorage.getItem('countOpenCells').length > 0) {
    localStorage.setItem('countOpenCells', `${localStorage.getItem('countOpenCells')},${countOpenCells.toString()}`);
    countOpenCells = localStorage.getItem('countOpenCells').split('.');
    countOpenCells = countOpenCells.map((el) => Number(el));
  } else {
    localStorage.setItem('countOpenCells', countOpenCells.toString());
  }
  countOpenCells = localStorage.getItem('countOpenCells').split(',');
  countOpenCells = countOpenCells.filter((number) => number !== '');
  countOpenCells = countOpenCells.map((el) => Number(el));
  countOpenCells = Array.from(new Set(countOpenCells));

  if (countOpenCells.length === 90) {
    stopGame();
    win();
    winLose();
  }
  if (localStorage.getItem('disabled').length > 0) {
    localStorage.setItem('disabled', `${localStorage.getItem('disabled')},${disabledArrey.toString()}`);
  } else {
    localStorage.setItem('disabled', disabledArrey.toString());
  }
  if (localStorage.getItem('inner').length > 0) {
    localStorage.setItem('inner', `${localStorage.getItem('inner')},${stateCells.toString()}`);
  } else {
    localStorage.setItem('inner', stateCells.toString());
  }

  const colors = children.map((child) => window.getComputedStyle(child).getPropertyValue('color'));
  localStorage.setItem('colorCount', colors.toString());
});

function mod(n, m) {
  return ((n % m) + m) % m;
}

function checkBomb(x, y) {
  const parsedX = Number(x);
  const parsedY = Number(y);
  return parsedX >= 1 && parsedX <= 10 && parsedY >= 1 && parsedY <= 10;
}
const colorCount = ['blue', 'green', 'red', 'yellow', 'brown', 'orange', 'lightskyblue', 'pink', 'violet'];
function count(x, y) {
  let count = 0;
  let coorBtn = mod(Number(y) - 1, 10) + Number((Number(x) - 1) * 10);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      coorBtn = mod(Number(y) - 1 + i, 10) + Number((x - 1 + j) * 10);
      if (bomb.includes(coorBtn) && checkBomb(Number(x) + j, Number(y) + i)) {
        count++;
      }
    }
  }
  coorBtn = mod(Number(y) - 1, 10) + Number((x - 1) * 10);
  for (let c = 1; c <= colorCount.length; c++) {
    if (count === c) {
      mineAreaDom.children[coorBtn].style.color = colorCount[c - 1];
    }
  }
  return count;
}
function countZero(x, y) {
  x = Number(x);
  y = Number(y);
  const countZero = [];
  let coorBtn1 = mod(Number(y) - 1, 10) + Number((Number(x) - 1) * 10);
  if ((x === 1) && (y === 1)) {
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10;
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          countZero.push(coorBtn1);
        }
      }
    }
  } else if ((x === 10) && (y === 10)) {
    for (let i = -1; i <= 0; i++) {
      for (let j = -1; j <= 0; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10;
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          countZero.push(coorBtn1);
        }
      }
    }
  } else if (!(x === 1 || x === 10) && (y === 10)) {
    for (let i = -1; i <= 0; i++) {
      for (let j = -1; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if ((x === 10) && (y !== 10 && y !== 1)) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 0; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if ((x === 1) && (y !== 10 && y !== 1)) {
    for (let i = -1; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if ((x === 1) && (y === 10)) {
    for (let i = -1; i <= 0; i++) {
      for (let j = 0; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if ((x === 10) && (y === 1)) {
    for (let i = 0; i <= 1; i++) {
      for (let j = -1; j <= 0; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if (!(x === 10 || x === 1) && (y === 1)) {
    for (let i = 0; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else if (!(x === 10 || x === 1) && (y === 10)) {
    for (let i = -1; i <= 0; i++) {
      for (let j = -1; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
          }
        }
      }
    }
  } else {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j) * 10);
        if (mineAreaDom.children[coorBtn1].innerHTML !== '🚩') {
          countZero.push(coorBtn1);
        }
      }
    }
  }
  return countZero;
}

function calculateIndexFromCoordinates(x, y) {
  return mod(Number(y) - 1, 10) + Number((Number(x) - 1) * 10);
}

function countAllZeros(x, y) {
  const visitedZeros = [];
  visitedZeros.push(calculateIndexFromCoordinates(x, y));
  const zeros = countZero(x, y);
  let startSize = -1;
  let endSize = -1;
  do {
    startSize = zeros.length;
    for (const element of zeros) {
      const [xe, ye] = getCoordinates(element);
      if (!visitedZeros.includes(element) && count(xe, ye) === 0) {
        visitedZeros.push(element);
        const moreZeros = countZero(xe, ye);
        for (const z of moreZeros) {
          const [zx, zy] = getCoordinates(z);
          if (!zeros.includes(z) && (zx === xe || zy === ye)) {
            zeros.push(z);
          }
        }
      }
    }
    endSize = zeros.length;
  } while (startSize !== endSize);
  return zeros;
}

function getCoordinates(index) {
  const x = Math.floor(index / 10) + 1;
  const y = (index % 10) + 1;
  return [x, y];
}

function addFlag() {
  const flagCount = flag.innerHTML;
  return Number(flagCount);
}

let countLongLeftMousClick = 0;
let flagSet = localStorage.getItem('flag').split(',');
flagSet = flagSet.filter((number) => number !== '');
flagSet = flagSet.map((el) => Number(el));
mineAreaDom.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  src = 'audio/tick.mp3';
  soundClick(src);
  if (!startGame) {
    startGameTimer();
  }
  const btnClass = event.target;
  const coordinate = btnClass.dataset.coordinates;
  const [x, y] = coordinate.split(':');
  let coorBtn = Number((y - 1) % 10) + Number((x - 1) * 10);
  if (event.target.innerHTML === '🚩') {
    flagSet = flagSet.filter((number) => number !== coorBtn);
    flag.innerHTML = addFlag() + 1;
    event.target.innerHTML = '';
    event.target.disabled = false;
  } else if (flag.innerHTML === '0') {
    // ...
  } else if (event.target.disabled === true) {
    // ...
  } else {
    flag.innerHTML = addFlag() - 1;
    const btnClass = event.target;
    const coordinate = btnClass.dataset.coordinates;
    const [x, y] = coordinate.split(':');
    coorBtn = Number((y - 1) % 10) + Number((x - 1) * 10);
    flagSet.push(coorBtn);
    event.target.innerHTML = '&#128681;';
    event.target.disabled = true;
  }
  localStorage.setItem('flag', flagSet.toString());
  localStorage.setItem('flagCount', flag.innerHTML.toString());
  console.log(localStorage.getItem('flag'), 'localka');
});

smile.addEventListener('click', () => {
  // document.location.reload();
  src = 'audio/start.mp3';
  soundClick(src);
  stopGame();
  flag.innerHTML = 10;
  countLongLeftMousClick = 0;
  countOpenCells = [];
  flagSet = [];
  bomb = [];
  second.innerHTML = '00';
  minute.innerHTML = '00';
  countClick = 0;
  timer = 0;
  ms = 0;
  sec = document.getElementById('second');
  min = document.getElementById('minute');
  startGame = false;
  bombIsReady = false;
  mineAreaDom.disabled = false;
  disabledArrey = [];
  stateCells = [];
  countOpenCells = [];
  smile.innerHTML = '&#129488;';
  localStorage.setItem('bombArrey', bomb.toString());
  localStorage.setItem('disabled', disabledArrey.toString());
  localStorage.setItem('inner', stateCells.toString());
  localStorage.setItem('flag', flagSet.toString());
  localStorage.setItem('flagCount', flag.innerHTML.toString());
  localStorage.setItem('countOpenCells', countOpenCells.toString());
  localStorage.setItem('second', timer.toString());
  localStorage.setItem('minute', '00');
  localStorage.setItem('countClick', countClick.toString());
  clicks.innerHTML = countClick;
  for (let cell = 0; cell < 100; cell++) {
    if (mineAreaDom.children[cell].innerHTML || mineAreaDom.children[cell].disabled) {
      mineAreaDom.children[cell].innerHTML = '';
      mineAreaDom.children[cell].disabled = false;
    }
  }
});
