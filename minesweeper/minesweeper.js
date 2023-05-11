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

console.log(chilCell);
function getRandomNumbers(quantity, range) {
  const numbers = [];
  for (let i = 1; i <= quantity; i++) {
    numbers.push(Math.floor(Math.random() * range));
  }
  return numbers;
}
const bomb = getRandomNumbers(10, quantity);
console.log(bomb);

mineArea.addEventListener('click', (event) => {
  const btnClass = event.target;
  if (btnClass.classList.contains('btn')) {
    // event.target.innerHTML
  }
});