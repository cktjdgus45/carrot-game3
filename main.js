//1.game start
let playing = false;
const playBtn = document.querySelector('.button');
const playField = document.querySelector('.playfield');
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

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
    item.dataset.x = `${x}px`;
    item.dataset.y = `${y}px`;
}

const setImgStyle = (img) => {
    img.style.left = img.dataset.x;
    img.style.top = img.dataset.y;
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
}

const makeItem = (name, count) => {
    let step;
    for (step = 0; step < count; step++) {
        const img = new Image();
        img.src = `./images/${name}.png`;
        img.onload = function () {
            getRandomCoords(img);
            setImgStyle(img);
            playField.insertAdjacentElement('afterbegin', img);
        }
    }
}

const showRandomPositionedItems = () => {
    if (!playing) {
        makeItem('carrot', CARROT_COUNT);
        makeItem('bug', BUG_COUNT);
    }
}

const changeIcon = () => {
    if (playing) {
        const playIcon = playBtn.childNodes[0].nextElementSibling;
        playIcon.className = 'fas fa-pause playBtn';
    }
}

const gameStart = (evnet) => {
    //set carrot,bug randomly
    showRandomPositionedItems();
    playing = true;
    //change icon
    changeIcon();
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