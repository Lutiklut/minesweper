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

function getRandomNumbers(quantity, range) {
  const numbers = [];
  for (let i = 1; i <= quantity; i++) {
    numbers.push(Math.floor(Math.random() * range));
  }
  return numbers;
}
const bomb = getRandomNumbers(10, quantity);
console.log(bomb)