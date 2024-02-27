makeGrid(5);
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('mouseover', (e) => {
        card.style.backgroundColor = 'red';
    });
});
function makeGrid(size){
    let container = document.getElementById('container-grid');

    //Calculate card size at creation
    const gridSize = parseInt(getComputedStyle(container).width);
    let cardSize = (gridSize/size)+"px";

    for(var i = 0; i < size; i++){
        let line = document.createElement('ul');
        line.classList.add('line');
        for(var j = 0; j < size; j++){
            let aux = document.createElement('div');
            aux.classList.add('card');
            aux.style.flexBasis = cardSize;
            line.appendChild(aux);
        }
        container.appendChild(line);
    }
}