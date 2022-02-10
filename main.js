//1.game start
let playing;
const playBtn = document.querySelector('.button');
const playField = document.querySelector('.playfield');
const modal = document.querySelector('.modal');
const replayBtn = modal.querySelector('.replay-container');
const seconds = document.querySelector('.seconds');
const result = document.querySelector('.result');
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
let gameTime = 13;
const bgSound = new Audio('./audio/bg.mp3');
let timeId;

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
    if (playing) {
        makeItem('carrot', CARROT_COUNT);
        makeItem('bug', BUG_COUNT);
    }
}

const handleModal = () => {
    modal.classList.toggle('hidden');
}

const handlePointer = (playing) => {
    if (playing) {
        playBtn.style.pointerEvents = 'auto';
        return;
    }
    playBtn.style.pointerEvents = 'none';
}

const changeIcon = () => {
    const playIcon = playBtn.childNodes[0].nextElementSibling;
    if (playing) {
        playIcon.className = 'fas fa-pause playBtn';
    } else {
        playIcon.className = 'fas fa-play playBtn';
    }
}

const audioStart = () => {
    bgSound.play();
}
const audioStop = () => {
    bgSound.pause();
    bgSound.currentTime = 0;
}

const handleSetInterval = () => {
    gameTime--;
    console.log(gameTime)
    seconds.innerHTML = gameTime < 10 ? `0${gameTime}` : `${gameTime}`;
    if (gameTime == 0) {
        playing = false;
        pausingGame();
    }
}

const showGameResult = () => {
    result.innerHTML = 'YOU FAIED!';
    //3가지 경우 -1.직접 정지 , 2.시간초과 혹은 벌레 클릭 , 3.시간안 성공.
}

const resetGameTime = () => {
    gameTime = 10;
}

const playingGame = () => {
    if (playing) {
        showRandomPositionedItems();
        changeIcon();
        handlePointer(playing);
        audioStart();
        timeId = setInterval(handleSetInterval, 1000);
        console.log('playing')
    }
}

const pausingGame = () => {
    if (!playing) {
        showRandomPositionedItems();
        changeIcon();
        handleModal();
        handlePointer(playing);
        audioStop();
        clearInterval(timeId);
        resetGameTime();
        showGameResult();
        console.log('pause')
    }
}

const handlePlayBtn = () => {
    if (!playing) {
        playing = true
    } else {
        playing = false;
    }
    //playing = true;
    playing ? playingGame() : pausingGame();
    //playing = false;
}

const removeItems = () => {
    Array.from(playField.childNodes).map(item => {
        playField.removeChild(item);
    })
}

const handlereplayBtn = () => {
    removeItems();
    handleModal();
    handlePlayBtn();
}

playBtn.addEventListener('click', handlePlayBtn);
replayBtn.addEventListener('click', handlereplayBtn);

//music start
//set time,score
//set carrot,bug randomly

//2.game end
//show modal
//music stop

//3.game redo
//do again 1 process.