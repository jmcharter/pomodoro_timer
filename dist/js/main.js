//Get DOM Elements
const btnStart = document.querySelector('.action-start');
const btnPause = document.querySelector('.action-pause');
const btnStop = document.querySelector('.action-stop');
const clockFace = document.querySelector('.pomodoro-clock-face')

//Init
let initTime = 1500;
let initBreak = 300;
let secondsRemaining = 1500;
let paused = true;
let onBreak = true;
let timer = 0;

const alarm = document.createElement('audio');
alarm.setAttribute("src", "http://bbcsfx.acropolis.org.uk/assets/07070161.wav");



//Assign button actions
btnStart.addEventListener('click', (event) => {
    toggleTimer();
});
btnPause.addEventListener('click', (event) => {
    toggleTimer();
});
btnStop.addEventListener('click', (event) => {
    toggleTimer("stop");
});

function toggleTimer() {
    if (paused) {
        paused = false;
        timer = setInterval(clockCountdown, 1000)
    } else {
        paused = true;
    }
}

function clockCountdown() {
    secondsRemaining--;
}

function updateDisplay() {
    let mins = Math.floor(secondsRemaining / 60);
    let secs = secondsRemaining % 60;

    clockFace.textContent = mins + ":" + (secs > 10 ? secs : '0' + secs);
}

window.setInterval(updateDisplay, 100);
