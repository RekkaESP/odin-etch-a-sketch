
const sizeButton = document.getElementById('button-size');
const clearButton = document.getElementById('button-clear');
const rainbowButton = document.getElementById('button-rainbow');
const darkenButton = document.getElementById('button-progressive');
const colorPicker = document.getElementById('input-colorpicker');
let currentColor = '#ffffff';
let currentSize = 0;

makeGrid(16);

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

clearButton.addEventListener('click', (e) => {
    clearGrid();
    makeGrid(currentSize);
});

rainbowButton.addEventListener('click', (e) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.removeEventListener('mouseover', handleCardMouseOver);
        card.removeEventListener('mouseover', handleDarkenCardMouseOver);
        card.addEventListener('mouseover', handleRainbowCardMouseOver);
        
    });
});

darkenButton.addEventListener('click', (e) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.removeEventListener('mouseover', handleCardMouseOver);
        card.removeEventListener('mouseover', handleRainbowCardMouseOver);
        card.addEventListener('mouseover', handleDarkenCardMouseOver);
        
    });
});

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    cards.forEach((card) => {
        card.removeEventListener('mouseover', handleDarkenCardMouseOver);
        card.removeEventListener('mouseover', handleRainbowCardMouseOver);
        card.addEventListener('mouseover', handleCardMouseOver);
    });
})

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
            aux.style.backgroundColor = "#f4eeff"

            aux.addEventListener('mouseover', handleCardMouseOver);
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

function handleCardMouseOver(e){
    e.target.style.backgroundColor = currentColor;
}
function handleRainbowCardMouseOver(e){
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = "#"+randomColor;
    
}
function handleDarkenCardMouseOver(e){

    let rgb = e.target.style.backgroundColor.match(/\d+/g);
    if(rgb[0] == NaN){
        rgb = hexToRgb(e.target.style.backgroundColor);
    }

    //Darken colors
    for(var i in rgb) {
        if(rgb[i] > 0){
        rgb[i] = parseInt(rgb[i],10) - 25.5;
        }
      }
    e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    
}

function hexToRgb(hex){

    //Remove hash
    hex = hex.replace('#', '');

    //Parse into three values
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(0,6),16);

    return {r,g,b};
}