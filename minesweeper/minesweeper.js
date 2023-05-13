const headerName = document.createElement('H1');
headerName.classList.add('name');
document.body.appendChild(headerName);
headerName.textContent = 'Minsweeper';

const mineArea = document.createElement('DIV');
mineArea.classList.add('area');
document.body.appendChild(mineArea);



const quantity = 100;
for (let i = 1; i <= quantity; i++) {
  const cell = document.createElement('BUTTON');
  cell.classList.add('btn');
  mineArea.appendChild(cell);
}

const chilCell = Array.from(mineArea.children);


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
mineArea.addEventListener('click', (event) => {
  const btnClass = event.target;
  const indx = chilCell.indexOf(event.target);
  for (let i = 0; i < buttons.length; i++) {
    const x = Math.floor(i / 10) + 1; 
    const y = (i % 10) + 1; 
    buttons[i].dataset.coordinates = `${x}:${y}`;
    buttons[i].addEventListener('click', (event) => {
      const button = event.target;
      const coordinate = button.dataset.coordinates;
    });
  }
  
  if (btnClass.classList.contains('btn')) {
    const coordinate = btnClass.dataset.coordinates;
    let [x, y] = coordinate.split(":");
    const coorBtn = Number((y-1)%10) + Number((x-1)*10);

      if(bomb.includes(coorBtn)){
       event.target.innerHTML = 'ХХ';
       event.target.disabled = true;
      }
      else{
    
        if (count(x, y) === 0){
        for(let i of countZero(x, y)) {
           // console.log(countZero(x, y))
         
            let сx = Math.floor (i /10) +1;
            let сy = i - Number((сx-1)*10) + 1;
            //console.log(сx, '- x',сy, '- y');
            //console.log(mineAreaDom.children[i], 'mineAreaDom[i]');
                event.target.innerHTML = '';
                //console.log(count(сx, сy), 'count(сx, сy)')
                if(count(сx, сy) === 0) { countZero(сx, сy);
                    mineAreaDom.children[i].innerHTML = '';
                    mineAreaDom.children[i].disabled = true;
                    event.target.disabled = true; }
                    else{
                mineAreaDom.children[i].innerHTML = count(сx, сy);
                mineAreaDom.children[i].disabled = true;
                event.target.disabled = true;}
                
        }}
    // если коунт равен 0 то 
        else { 
            
        event.target.innerHTML =  count(x, y);
        event.target.disabled = true;
    }
       
    //console.log(`Координаты кнопки: ${coordinate}`);
    //console.log(indx);

  }}
});
function checkBomb (x, y) {
  x = Number(x); 
  y = Number(y);
  return x >= 1 && x <= 10 && y >= 1 && y <= 10; 
};
// function bomba(x, y) {
        
//     if(!checkBomb(x, y)) {
//       return false
//     }
//     const ind = mod(Number(y) - 1, 10) + Number((x-1)*10);
//     return bomb.includes(ind)
  
//   }
     

function count(x, y) {
  let count = 0;
  let coorBtn1 = mod(Number(y) - 1 , 10) + Number((x-1)*10);
  let cx = Math.floor (coorBtn1 /10) +1;
  let cy = coorBtn1 - Number((cx-1)*10) + 1; 

    for(let i = -1; i<= 1; i++) {
      for(let j = -1; j<= 1; j++) {
        let coorBtn = mod(Number(y) - 1 + i, 10) + Number((x-1+j)*10);
        console.log()        
        if(bomb.includes(coorBtn)&&checkBomb(Number(x)+j,Number(y)+i) ) {
          count++;
          //console.log(coorBtn,'bomb');
        }
      }
    } 
  
  return count;
}
// ВЫНЕСТИ ЦИКЛЫ В ФУНКЦИЮ И ПОДАВАТЬ В IF ОТДЕЛЬНО
function countZero(x, y) {
    x = Number(x)
    y = Number(y)
    let countZero=[];
    let coorBtn = mod(Number(y) - 1 , 10) + (Number(x)-1)*10; 
    let coorBtn1 = mod(Number(y) - 1, 10) + Number((Number(x)-1)*10); 
    if ((x === 1 ) && (y === 1)) {
      for(let i = 0; i <= 1; i++) {
        for(let j = 0; j <= 1; j++) {  /// проверка на крайние значения      
         
          coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10; 
          //console.log(i,j, typeof(coorBtn1),coorBtn1, typeof(mod(Number(y) - 1 + i, 10)),y - 1 + i,'- y - 1 + i',(mod(Number(y) - 1 + i, 10)), typeof(Number((x - 1 + j)*10)),Number((x - 1 + j)*10))
          countZero.push(coorBtn1)

        }
      }
    }
    else if (( x === 10) && ( y=== 10)) {
        for(let i = -1; i <= 0; i++) {
          for(let j = -1; j <= 0; j++) {  /// проверка на крайние значения      
            coorBtn1 = mod(Number(y) - 1 + i, 10) + (Number(x) - 1 + j) * 10; 
            //console.log(i,j, typeof(coorBtn1),coorBtn1, typeof(mod(Number(y) - 1 + i, 10)),y - 1 + i,'- y - 1 + i',(mod(Number(y) - 1 + i, 10)), typeof(Number((x - 1 + j)*10)),Number((x - 1 + j)*10))
            countZero.push(coorBtn1)           
          }
        }
      }
    else if (!(x === 1 || x === 10) && ( y=== 10)) {
        for(let i = -1; i<= 0; i++) {
            for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения       
              coorBtn1 = mod (Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
              if (coorBtn1 >= 0)
              {countZero.push(coorBtn1); }
            }
          }
        }
        else if (( x === 10) && (y != 10 && y != 1 )) {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 0; j++) {  /// проверка на крайние значения       
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1) } 
                }
              }
        }
        else if (( x === 1) && (y != 10 && y != 1 )) {
            for(let i = -1; i <= 1; i++) {
                for(let j = 0; j <= 1; j++) {  /// проверка на крайние значения      
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1)} 
                }
              }
        }
        else if (( x === 1) && (y === 10 )) {
            for(let i = -1; i <= 0; i++) {
                for(let j = 0; j <= 1; j++) {  /// проверка на крайние значения      
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1)} 
                }
              }
        }    
        else if (( x === 10) && ( y === 1 )) {
            for(let i = 0; i <= 1; i++) {
                for(let j = -1; j <= 0; j++) {  /// проверка на крайние значения      
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1) ;} 
                }
              }
        }
        else if (!( x === 10 ||  x === 1) && ( y === 1 )) {
            for(let i = 0; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения      
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1); } 
                }
              }
        }
        else if (!( x === 10 ||  x === 1) && ( y === 10 )) {
            for(let i = -1; i <= 0; i++) {
                for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения        
                  coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
                  if (coorBtn1 >= 0)
                  {countZero.push(coorBtn1);} 
                }
              }
        }
        else {  for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {  /// проверка на крайние значения      
              coorBtn1 = mod(Number(y) - 1 + i, 10) + Number((Number(x) - 1 + j)*10); 
              countZero.push(coorBtn1) 
            }
          }}

    return countZero;
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }



  
