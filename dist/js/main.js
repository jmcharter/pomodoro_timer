//Get DOM Elements
const btnStart = document.querySelector('.action-start');
const btnPause = document.querySelector('.action-pause');
const btnStop = document.querySelector('.action-stop');
const clockFace = document.querySelector('.pomodoro-clock-face');
const btnTimerPlus = document.querySelector('.action-workTimerPlus');
const btnTimerMinus = document.querySelector('.action-workTimerMinus');
const workTime = document.querySelector('#worktime');


//Init
let initTime = 1500; //seconds
let shortBreak = 300; //seconds
let secondsRemaining = 1500;
let paused = true;
let onBreak = true;
let timer = 0; //variable for setInterval

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
    toggleTimer(true);
});
btnTimerPlus.addEventListener('click', (event) => {
    adjustTimer(1);
});
btnTimerMinus.addEventListener('click', (event) => {
    adjustTimer(0);
});


function toggleTimer(checkStop) {
    if (checkStop) {
        clearInterval(timer);
        secondsRemaining = initTime;
    }
    else if (paused) {
        paused = false;
        timer = setInterval(clockCountdown, 1000)
    } else {
        paused = true;
        clearInterval(timer);
    }
}

function adjustTimer(increment) {
    if (increment) {
        initTime += 300
    } else if (initTime > 300) {
        initTime -= 300
    }

    let workTimerSetting = Math.floor(initTime / 60);

    //conditional adds leading zero when seconds are a single digit.
    workTime.textContent = workTimerSetting + " Minutes";

}

function clockCountdown() {
    secondsRemaining--;
}

function updateDisplay() {
    let mins = Math.floor(secondsRemaining / 60);
    let secs = secondsRemaining % 60;

    //conditional adds leading zero when seconds are a single digit.
    clockFace.textContent = mins + ":" + (secs > 10 ? secs : '0' + secs);
}

window.setInterval(updateDisplay, 100);
