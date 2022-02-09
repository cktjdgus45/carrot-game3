//1.game start
let playing = false;
const playBtn = document.querySelector('.button');
const playField = document.querySelector('.playfield');
const ITEM_COUNT = 10;

const getRandomNumber = (min, max) => {
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
}

const getRandomCoords = (item) => {
    const minWidth = 0;
    const maxWidth = playField.getBoundingClientRect().width - item.naturalWidth;
    const x = getRandomNumber(minWidth, maxWidth);
    const minHeight = 0;
    const maxHeight = playField.getBoundingClientRect().height - item.naturalHeight;
    const y = getRandomNumber(minHeight, maxHeight);
    const coords = {
        x,
        y
    }
    return coords;
}

const setItemStyle = (item, itemName) => {
    item.src = `./images/${itemName}.png`;
    item.style.position = 'absolute';
    item.style.left = `${getRandomCoords(item).x}px`;
    item.style.top = `${getRandomCoords(item).y}px`;
}

const attachItemOnFiled = (count) => {
    let step;
    for (step = 0; step < count; step++) {
        const carrot = document.createElement('img');
        const bug = document.createElement('img');
        setItemStyle(carrot, 'carrot');
        setItemStyle(bug, 'bug');
        playField.appendChild(carrot);
        playField.appendChild(bug);
    }
}

const showRandomPositionedItems = () => {
    if (!playing) {
        attachItemOnFiled(ITEM_COUNT);
    }
}

const gameStart = (evnet) => {
    showRandomPositionedItems();
    playing = true;
    //set carrot,bug randomly
    //set time,score
    //music start
}

playBtn.addEventListener('click', gameStart);
//mustic start
//set time,score
//set carrot,bug randomly

//2.game end
//show modal
//music stop

//3.game redo
//do again 1 process.