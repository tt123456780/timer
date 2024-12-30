let timerType = 'countdown';
let timerInterval;
let isRunning = false;
let timeInSeconds = 0;
let initialTime = 0;

function setTimerType(type) {
    timerType = type;
    const buttons = document.querySelectorAll('.timer-type button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    resetTimer();
}

function startTimer() {
    if (isRunning) return;
    
    if (!timerInterval) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        
        timeInSeconds = hours * 3600 + minutes * 60 + seconds;
        initialTime = timeInSeconds;
    }

    if (timerType === 'countdown' && timeInSeconds === 0) return;

    isRunning = true;
    timerInterval = setInterval(() => {
        if (timerType === 'countdown') {
            if (timeInSeconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                return;
            }
            timeInSeconds--;
        } else {
            timeInSeconds++;
        }
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timerInterval = null;
    timeInSeconds = 0;
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    document.getElementById('event-name').value = '';
}

function updateDisplay() {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    document.getElementById('hours').value = hours.toString().padStart(2, '0');
    document.getElementById('minutes').value = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').value = seconds.toString().padStart(2, '0');
}

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Input validation
function validateTimeInput(input) {
    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (this.id === 'hours') {
            if (value > 99) this.value = 99;
        } else {
            if (value > 59) this.value = 59;
        }
        if (value < 0) this.value = 0;
    });
}

const timeInputs = document.querySelectorAll('.time-input input');
timeInputs.forEach(validateTimeInput);