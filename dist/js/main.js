//Get DOM Elements
const btnStart = document.querySelector('.action-start');
const btnStop = document.querySelector('.action-stop');
const clockFace = document.querySelector('.pomodoro-clock-face');
const task = document.querySelector('.pomodoro-task h2');
const editIcon = document.querySelector('.pomodoro-task .fa-edit');
const infoModal = document.querySelector(".pomodoro-method");
const modalToggle = document.querySelector('#modal-toggle');
const modalBackdrop = document.querySelector('.backdrop');
const break_counters = document.querySelectorAll('.circle');


//Init
let workTime = 1500; //seconds
let breakTime = 300; //seconds
let secondsRemaining = 1500;
let paused = true;
let onBreak = false;
let breakCount = 0;
let timer = 0; //variable for setInterval

//Stop enter from creating a newline when editing the task element.
task.addEventListener('keypress', (e) => {
    if (e.which === 13) {
        e.preventDefault();
    }
});

//Remove the edit icon once something has been typed.
task.addEventListener("input", () => {
    editIcon.style.opacity = "0"
    editIcon.style.transform = "translateX(0.5rem)"
    task.style.transform = "translateX(1rem)"
})

//Add or remove .show class to Modal on click.
modalToggle.addEventListener('click', () => {
    infoModal.classList.add("show");
})

//This makes clicking anywhere outside the modal close it.
modalBackdrop.addEventListener("click", (e) => {
    if (e.target != infoModal) {
        infoModal.classList.remove("show");
    }
});

//Add alarm audio
const alarm = new Audio('/audio/analog-watch-alarm_daniel-simion.mp3')


// Add logic to plus and minus buttons for both work and break timers
function applyBtnLogic(plusBtnSelector, minusBtnSelector, timeSelect, timeDisplaySelect) {
    const plusBtn = document.querySelector(plusBtnSelector);
    const minusBtn = document.querySelector(minusBtnSelector);

    plusBtn.addEventListener('click', () => {
        adjustTimer(1, timeSelect, timeDisplaySelect);
    })
    minusBtn.addEventListener('click', () => {
        adjustTimer(0, timeSelect, timeDisplaySelect);
    })
}


//Assign button actions
applyBtnLogic(".action-workTimerPlus", ".action-workTimerMinus", "#worktime", "work")
applyBtnLogic(".action-breakTimerPlus", ".action-breakTimerMinus", "#breaktime", "break")

btnStart.addEventListener('click', (event) => {
    toggleTimer();
    if (btnStart.innerHTML == "Start") { btnStart.innerHTML = "Pause" }
    else { btnStart.innerHTML = "Start" }
});
btnStop.addEventListener('click', (event) => {
    toggleTimer(true);
    btnStart.innerHTML = "Start";
});


function adjustTimer(isPlus, timeSelect, timeDisplaySelect) {
    if (isPlus) {
        switch (timeDisplaySelect) {
            case "work": workTime += 300;
            case "break": breakTime += 300;
        }
    } else {
        switch (timeDisplaySelect) {
            case "work": if (workTime > 300) { workTime -= 300 };
            case "break": if (breakTime > 300) { breakTime -= 300 };

        }
    };

    let timerSetting = Math.floor((timeDisplaySelect === "work" ? workTime : breakTime) / 60);
    document.querySelector(timeSelect).textContent = timerSetting + " Minutes";
}

function updateBreakCounter(){
    if (breakCount <= 4){
        for(let i=0; i<breakCount; i++){
            break_counters[i].classList.add('circle-active');
        }
    } else {
        breakCount = 0;
        for(let i=0; i<break_counters.length; i++){
            break_counters[i].classList.remove('circle-active');
        }
    }
}

function toggleTimer(checkStop) {
    //When true is passed into the function, run the following. Otherwise, toggle the timer.
    if (checkStop) {
        clearInterval(timer);
        if (!onBreak) {
            secondsRemaining = workTime;
        } else {
            secondsRemaining = breakTime;
        }
        alarm.pause();
        paused = true;
    }
    else if (paused) {
        paused = false;
        alarm.pause()
        timer = setInterval(clockCountdown, 1000)
    } else {
        paused = true;
        clearInterval(timer);
    }
}


function clockCountdown() {
    secondsRemaining--;
    if (secondsRemaining <= 0) {
        clearInterval(timer)
        alarm.currentTime = 0; //Start audio file from beginnning.
        alarm.play();
        btnStart.innerHTML = "Start";
        paused = true;

        if (!onBreak) {
            breakCount++
            secondsRemaining = breakTime;
        } else {
            secondsRemaining = workTime;
        }
        onBreak = !onBreak; //Toggle onBreak status.
        paused = true;
        updateBreakCounter();

    }
}

function updateDisplay() {
    let mins = Math.floor(secondsRemaining / 60);
    let secs = secondsRemaining % 60;

    //conditional adds leading zero when seconds are a single digit.
    clockFace.textContent = mins + ":" + (secs > 9 ? secs : '0' + secs);
}

window.setInterval(updateDisplay, 100);
