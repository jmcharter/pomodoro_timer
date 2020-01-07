//Get DOM Elements
const btnStart = document.querySelector('.action-start');
const btnPause = document.querySelector('.action-pause');
const btnStop = document.querySelector('.action-stop');
const clockFace = document.querySelector('.pomodoro-clock-face');
const btnWorkTimerPlus = document.querySelector('.action-workTimerPlus');
const btnWorkTimerMinus = document.querySelector('.action-workTimerMinus');
const workTimeDisplay = document.querySelector('#worktime');
const btnBreakTimerPlus = document.querySelector('.action-breakTimerPlus');
const btnBreakTimerMinus = document.querySelector('.action-breakTimerMinus');
const breakTimeDisplay = document.querySelector('#breaktime');


//Init
let workTime = 1500; //seconds
let breakTime = 300; //seconds
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
btnWorkTimerPlus.addEventListener('click', (event) => {
    adjustTimer(1, "work");
});
btnWorkTimerMinus.addEventListener('click', (event) => {
    adjustTimer(0, "work");
});
btnBreakTimerPlus.addEventListener('click', (event) => {
    adjustTimer(1, "break");
});
btnBreakTimerMinus.addEventListener('click', (event) => {
    adjustTimer(0, "break");
});


function toggleTimer(checkStop) {
    //When true is passed into the function, run the following. Otherwise, toggle the timer.
    if (checkStop) {
        clearInterval(timer);
        secondsRemaining = workTime;
        alarm.pause();
        alarm.currentTime = 0;
        paused = true;
    }
    else if (paused) {
        paused = false;
        timer = setInterval(clockCountdown, 1000)
    } else {
        paused = true;
        clearInterval(timer);
    }
}

function adjustTimer(increment, btnType) {
    if (increment) {
        workTime += 300;
    } else if (workTime > 300) {
        workTime -= 300
    };

    let timerSetting = Math.floor(workTime / 60);
    workTimeDisplay.textContent = timerSetting + " Minutes";
}

function clockCountdown() {
    secondsRemaining--;
    if (secondsRemaining <= 0) {
        clearInterval(timer)
        alarm.currentTime = 0; //Start audio file from beginnning.
        alarm.play();

        if (!onBreak) { breakCount++ }
        onBreak = !onBreak; //Toggle onBreak status.
    }
}

function updateDisplay() {
    let mins = Math.floor(secondsRemaining / 60);
    let secs = secondsRemaining % 60;

    //conditional adds leading zero when seconds are a single digit.
    clockFace.textContent = mins + ":" + (secs > 10 ? secs : '0' + secs);
}

window.setInterval(updateDisplay, 100);
