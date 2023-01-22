// elements
var winsEl = document.querySelector('#wins');
var lossesEl = document.querySelector('#losses');
var timerEl = document.querySelector('#timer');
var startBtn = document.querySelector('#start');
var resetBtn = document.querySelector('#reset');
var wordEl = document.querySelector('#word');

// game settings
var timerDefault = 10;
var wordOptions = ['boolean', 'array', 'function', 'variable', 'browser', 'html', 'css'];

// game state 
var gameStarted = false
var timer = 0;
var wins = 0;
var losses = 0;
var word = null;
var selectedKeys = [];
var countdownTimer;

// functions
function startGame() {
    gameStarted = true;
    startBtn.disabled = true;
    timer = timerDefault;
    selectedKeys = [];

    chooseWord();
    renderTimer();
    startTimer();
}

function chooseWord() {
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    renderWord();
}

function renderWord() {
    var wordDisplay = [];

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();

        if(selectedKeys.includes(letter)) {
            wordDisplay.push(letter)
        } else {
            wordDisplay.push('_');
        }
    }

    wordEl.textContent = wordDisplay.join(' ');
    checkWin();
}

function checkWin() {
    var wonGame = true;

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        
        if(!selectedKeys.includes(letter)) {
            wonGame = false
            break;
        }
    }

    if(wonGame) {
        winGame();
    }
}

function renderTimer(value) {
    timerEl.textContent = value ? value : timer;
}

function startTimer() {
    countdownTimer = setInterval(function() {
        timer--;
        renderTimer();
        if(timer === 0) {
            loseGame();
        }
    }, 1000);
}

function loseGame() {
    losses++;
    endGame();
}

function winGame() {
    wins++;
    endGame();
}

function endGame() {
    clearInterval(countdownTimer);
    gameStarted = false;
    startBtn.disabled = false;
    renderScores();
}

function renderScores() {
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
}

function resetScores() {
    wins = 0;
    losses = 0;
    renderScores();
}
 
function guessLetter(event) {
    if(gameStarted) {
        var selectedKey = event.key.toLowerCase();
        
        if(!selectedKeys.includes(selectedKey)) {
            selectedKeys.push(selectedKey);
        }

        renderWord();
    }
}

function init() {
    renderTimer(timerDefault);
    renderScores();
}

// event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetScores);
document.addEventListener('keydown', guessLetter);

init();