
const cards = document.querySelectorAll('.card');
const sizeButton = document.getElementById('button-size');
let color = 'red';
let currentSize = 0;

sizeButton.addEventListener('click', (e) => {
    let size = parseInt(prompt('Choose grid size in squares per line',4),10);
    clearGrid();
    if(size > 100){
        alert("Size selected over limit (100x100 max)")
        size = 4;
    }
    if(size == NaN){
        size = 4;
    }
    makeGrid(size);
});

cards.forEach((card) => {
    card.addEventListener('mouseover', (e) => {
        card.style.backgroundColor = color;
    });
});

function makeGrid(size){
    let container = document.getElementById('container-grid');
    currentSize = size;
    //Calculate card size at creation
    const gridSize = parseInt(getComputedStyle(container).flexBasis);
    let cardSize = (gridSize/size)+"px";

    for(var i = 0; i < size; i++){
        let line = document.createElement('ul');
        line.classList.add('line');
        for(var j = 0; j < size; j++){
            let aux = document.createElement('div');
            aux.classList.add('card');
            aux.style.flexBasis = cardSize;

            aux.addEventListener('mouseover', (e) => {
                aux.style.backgroundColor = color;
            });
            line.appendChild(aux);
        }
        container.appendChild(line);
    }
}

function clearGrid(){
    let container = document.getElementById('container-grid');
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        container.removeChild(line);
    });
}