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

//console.log(chilCell);
function getRandomNumbers(quantity, range) {
  const numbers = [];
  for (let i = 1; i <= quantity; i++) {
    numbers.push(Math.floor(Math.random() * range));
  }
  return numbers;
}
const bomb = getRandomNumbers(10, quantity);
console.log(bomb);


const buttons = document.getElementsByClassName('btn');

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
    const [x, y] = coordinate.split(":");
    const coorBtn = Number((y-1)%10) + Number((x-1)*10);
    console.log(coorBtn,1000);
      if(bomb.includes(coorBtn)){
       event.target.innerHTML = '9';
       event.target.disabled = true;
      }
      else{
        event.target.innerHTML =  count(x, y);
        event.target.disabled = true;
       }
    //console.log(`Координаты кнопки: ${coordinate}`);
    //console.log(indx);

    }
});

function count(x, y) {
  let count = 0;
  for(let i = -1; i<= 1; i++) {
    for(let j = -1; j<= 1; j++) {
      let coorBtn = Number((y-1+i)%10) + Number((x-1+j)*10);   
      
      if(bomb.includes(coorBtn)) {
        count++;
        console.log(coorBtn,'bomb');
      }
    }
  }
  return count;
}