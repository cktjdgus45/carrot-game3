const playBtn = document.querySelector('.button');
const playField = document.querySelector('.playfield');
const modal = document.querySelector('.modal');
const replayBtn = modal.querySelector('.replay-container');
const seconds = document.querySelector('.seconds');
const result = document.querySelector('.result');
const score = document.querySelector('.score');

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
let gameTime = 10;
let playing;
let timeId;
let resultStates = {
    win: "win",
    timeover: "timeover",
    lose: "lose"
};

const bgSound = new Audio('./audio/bg.mp3');
const bugPullSound = new Audio('./audio/bug_pull.mp3');
const carrotPullSound = new Audio('./audio/carrot_pull.mp3');

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

const showGameResult = (resultStates) => {
    switch (resultStates) {
        case "win":
            const gameWinSound = new Audio('./audio/game_win.mp3');
            gameWinSound.play();
            result.innerText = "you won!";
            break;
        case "timeover":
            result.innerText = "time over!";
            const alertSound = new Audio('./audio/alert.wav');
            alertSound.play();
            break;
        case "lose":
            result.innerText = "you lose!";
            break;
        case "default":
            result.innerText = "try again!";
            break;
        default:
            throw Error('result is unexpacted');
    }
}

const handleCarrotClicked = (event) => {
    const clicked = event.target;
    playField.removeChild(clicked);
    const carrotCount = Array.from(playField.children).filter(item => item.className == "carrot").length;
    score.innerHTML = `${carrotCount}`;
    carrotPullSound.play();
    if (carrotCount === 0) { //성공할경우.
        playing = false;
        pausingGame(resultStates.win);
    }
}
const handleBugClicked = () => { //벌레 누를경우.
    bugPullSound.play();
    playing = false;
    pausingGame(resultStates.lose);
}

const setImgStyle = (img) => {
    img.style.left = img.dataset.x;
    img.style.top = img.dataset.y;
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
}

const setImgEvent = (img, name) => {
    if (name === "carrot") {
        img.onclick = handleCarrotClicked;
    } else if (name === "bug") {
        img.onclick = handleBugClicked;
    }
}
const setScore = () => {
    const carrotCount = Array.from(playField.children).filter(item => item.className == "carrot").length;
    score.innerHTML = `${carrotCount}`;
}
const makeItem = (name, count) => {
    let step;
    for (step = 0; step < count; step++) {
        const img = new Image();
        img.src = `./images/${name}.png`;
        img.className = name;
        img.onload = function () {
            getRandomCoords(img);
            setImgStyle(img);
            setImgEvent(img, name);
            playField.insertAdjacentElement('afterbegin', img);
            setScore();
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
    Array.from(playField.children).map(item => item.style.pointerEvents = 'none');
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
    seconds.innerHTML = gameTime < 10 ? `0${gameTime}` : `${gameTime}`;
    if (gameTime == 0) { //시간초과할경우.
        playing = false;
        pausingGame(resultStates.timeover);
    }
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
    }
}

const pausingGame = (resultState) => {
    if (!playing) {
        showRandomPositionedItems();
        changeIcon();
        handleModal();
        handlePointer(playing);
        audioStop();
        clearInterval(timeId);
        resetGameTime();
        showGameResult(resultState || "default");
    }
}

const handlePlayBtn = () => {
    if (!playing) {
        playing = true
    } else {
        playing = false;
    }
    playing ? playingGame() : pausingGame();
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
