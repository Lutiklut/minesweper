const flagSymb ='&#128681;';
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
close.innerHTML = '&#9421;';




close.addEventListener('click',()=> { 
  popup.style.display = 'none';
  document.body.style.overflow = "";
  smile.disabled = false;
});



const headerName = document.createElement('H1');
headerName.classList.add('name');
document.body.appendChild(headerName);
headerName.textContent = 'Minsweeper';

const totalArea = document.createElement('DIV');
totalArea.classList.add('total');
document.body.appendChild(totalArea);

const flag = document.createElement('DIV');
flag.classList.add('flag');
totalArea.appendChild(flag);
flag.innerHTML = 10;

const smile = document.createElement('BUTTON');
smile.classList.add('smile');
totalArea.appendChild(smile);


const image = document.createElement('img');
image.classList.add('img');
image.src  = 'img/game.jpeg';
image.alt = 'Think smile';
smile.appendChild(image);

smile.addEventListener('click',()=> {
    document.location.reload();
});

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


var timer = 0;
var timerInterval;
var ms = 0;
var sec = document.getElementById('second');
var min = document.getElementById('minute');

function startGame() {
    stopGame();
    timerInterval = setInterval(function() {
      timer += 1/60;
      let msF = Math.floor((timer - Math.floor(timer))*100);
      let secondF = Math.floor(timer) - Math.floor(timer/60) * 60;
      let minuteF = Math.floor(timer/60);
      if (msF < 10) {
        ms = "0" + secondF.toString();
      }
      else {
        ms = msF;
      }
      if (secondF < 10) {
        second.innerHTML = "0" + secondF.toString();
      }
      else {
        second.innerHTML = secondF;
      }
      if (minuteF < 10) {
        minute.innerHTML = "0" + minuteF.toString();
      }
      else {
        minute.innerHTML = minuteF;
      }
    }, 1000/60);
  }
  
  function stopGame() {
    clearInterval(timerInterval);

  }


function getRandomNumbers(quantity, range) {
  const numbers = [];
  while (numbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * range);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
    return numbers;
}  
const bomb = getRandomNumbers(10, quantity);
console.log(bomb);

const buttons = document.getElementsByClassName('btn');
const mineAreaDom=document.querySelector('.area')

//=========Координаты======
for (let i = 0; i < buttons.length; i++) {
    const x = Math.floor(i / 10) + 1; 
    const y = (i % 10) + 1; 
    buttons[i].dataset.coordinates = `${x}:${y}`;
}
let countOpenCells = [];

mineArea.addEventListener('click', (event) => {
    startGame()
  const btnClass = event.target;
  
  if (btnClass.classList.contains('btn')) {
    const coordinate = btnClass.dataset.coordinates;
    let [x, y] = coordinate.split(":");
    const coorBtn = Number((y-1)%10) + Number((x-1)*10);
    console.log('coordinate: ' + coorBtn);

      if(bomb.includes(coorBtn)){
        event.target.innerHTML = '&#164;';
        event.target.disabled = true;
        for(let mine of bomb) {
          mineAreaDom.children[mine].innerHTML = '&#128163;';
        };
        for(let i = 0; i < mineAreaDom.children.length; i++) {
          mineAreaDom.children[i].disabled = true;
        };
        stopGame();
        let time = Number(second.innerHTML)+Number(minute.innerHTML)
        console.log(`${time}`)
        image.src = 'img/loose.png';
        info.innerHTML = `К сожалению, Вы проиграли. Время игры - ${time} сек.`;
        popup.style.display ='block';
        mineAreaDom.disabled = true;
        document.body.style.overflow = "hidden"
        smile.disabled = true;
        
      }
      else{
        if (count(x, y) === 0){
          let zeros = countAllZeros(x, y);
          
        //   console.log('zeros =', zeros);
          for(let i of zeros) {
            countOpenCells.push(i);
            let сx = Math.floor (i /10) +1;
            let сy = i - Number((сx-1)*10) + 1;
                event.target.innerHTML = '';
                if(count(сx, сy) === 0) { 
                  mineAreaDom.children[i].innerHTML = '';
                  mineAreaDom.children[i].disabled = true;
                  event.target.disabled = true; }
                else{
                  mineAreaDom.children[i].innerHTML = count(сx, сy);
                  mineAreaDom.children[i].disabled = true;
                  event.target.disabled = true;
                }       
          }
        }
        else {    
          event.target.innerHTML =  count(x, y);
          event.target.disabled = true;
          countOpenCells.push(coorBtn);
        }
      }
    }
  
  countOpenCells = Array.from(new Set(countOpenCells));
  if (countOpenCells.length === 90) {
    stopGame();
    image.src = 'img/win.png'
    alert('you win')
  }

});


function checkBomb (x, y) {
  x = Number(x); 
  y = Number(y);
  return x >= 1 && x <= 10 && y >= 1 && y <= 10; 
};
     
const colorCount =['blue', 'green', 'red', 'yellow', 'brown', 'orange', 'lightskyblue', 'pink', 'violet']
function count(x, y) {
  let count = 0;
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        let coorBtn = mod(Number(y) - 1 + i, 10) + Number((x-1+j)*10);      
        if(bomb.includes(coorBtn)&&checkBomb(Number(x)+j,Number(y)+i) ) {
          count++;
        }
      }
    } 
    coorBtn = mod(Number(y) - 1 , 10) + Number((x-1)*10); 
    for (let c = 1; c <= colorCount.length; c++) {
      if (count === c) {
        mineAreaDom.children[coorBtn].style.color = colorCount[c-1];
      }
    }
  return count;
}
// ВЫНЕСТИ ЦИКЛЫ В ФУНКЦИЮ И ПОДАВАТЬ В IF ОТДЕЛЬНО
function countZero(x, y) {
  x = Number(x)
  y = Number(y)
  let countZero=[];
  //let coorBtn = mod(Number(y) - 1 , 10) + (Number(x)-1)*10; 
  let coorBtn1 = mod(Number(y) - 1, 10) + Number((Number(x)-1)*10); 
  if ((x === 1 ) && (y === 1)) {
    for(let i = 0; i <= 1; i++) {
      for(let j = 0; j <= 1; j++) { 
        coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10; 
        countZero.push(coorBtn1);
      }
    }
  }
  else if (( x === 10) && ( y=== 10)) {
        for(let i = -1; i <= 0; i++) {
          for(let j = -1; j <= 0; j++) {    
            coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10; 
            countZero.push(coorBtn1);           
      }
    }
  }
  else if (!(x === 1 || x === 10) && ( y=== 10)) {
    for(let i = -1; i<= 0; i++) {
      for(let j = -1; j <= 1; j++) { 
        coorBtn1 = mod (Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
          countZero.push(coorBtn1);
        }
      }
    }
  }
  else if (( x === 10) && (y != 10 && y != 1 )) {
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 0; j++) {    
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
          countZero.push(coorBtn1); 
        } 
      }
    }
  }
  else if (( x === 1) && (y != 10 && y != 1 )) {
    for(let i = -1; i <= 1; i++) {
      for(let j = 0; j <= 1; j++) {    
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
        } 
      }
    }
  }
  else if (( x === 1) && (y === 10 )) {
    for(let i = -1; i <= 0; i++) {
      for(let j = 0; j <= 1; j++) {      
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
          countZero.push(coorBtn1);
        } 
      }
    }
  }    
  else if (( x === 10) && ( y === 1 )) {
    for(let i = 0; i <= 1; i++) {
      for(let j = -1; j <= 0; j++) {  /// проверка на крайние значения      
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
            countZero.push(coorBtn1);
        } 
      }
    }
  }
  else if (!( x === 10 ||  x === 1) && ( y === 1 )) {
    for(let i = 0; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения      
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
          countZero.push(coorBtn1); 
        } 
      }
    }
  }
  else if (!( x === 10 ||  x === 1) && ( y === 10 )) {
    for(let i = -1; i <= 0; i++) {
      for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения        
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        if (coorBtn1 >= 0) {
          countZero.push(coorBtn1);
        } 
      }
    }
  }
  else {  
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения      
        coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
        countZero.push(coorBtn1); 
      }
    }
  }


  return countZero;
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }

function countAllZeros(x, y) {
  let visitedZeros = [];
  visitedZeros.push(calculateIndexFromCoordinates(x, y));
  console.log(visitedZeros, typeof(visitedZeros))
  let zeros = countZero(x, y);
  let startSize = -1;
  let endSize = -1;
  do {
    startSize = zeros.length;
    console.log(visitedZeros, zeros, startSize, endSize);
    for (let element of zeros) {
      let [xe, ye] = getCoordinates(element)
        if (!visitedZeros.includes(element) && count(xe, ye) === 0) {
          visitedZeros.push(element);
          let moreZeros = countZero(xe, ye);
          for (let z of moreZeros) {
            let [zx, zy] = getCoordinates(z);
            if (!zeros.includes(z) && (zx == xe || zy == ye)) {
              zeros.push(z);
            }
          }
        }
    }
        endSize = zeros.length;
  } while (startSize != endSize);

  return zeros;
}

function calculateIndexFromCoordinates(x, y) {
  return mod(Number(y) - 1, 10) + Number((Number(x) - 1)*10);
  }

function getCoordinates(index) {
  const x = Math.floor(index / 10) + 1; 
  const y = (index % 10) + 1;
  return [x, y];
}


function addFlag() {

}
  
