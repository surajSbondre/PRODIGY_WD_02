let startTime;
let intervalId;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

function startStop() {
    if (running) {
        clearInterval(intervalId);
        startTime =  Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - (startTime ? startTime : 0);
        intervalId = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
}

function updateTime() {
    const currentTime = new Date(Date.now() - startTime);
    const minutes = currentTime.getUTCMinutes();
    const seconds = currentTime.getUTCSeconds();
    const milliseconds = currentTime.getUTCMilliseconds();

    display.textContent = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds, true)}`;
}

function padTime(value, isMilliseconds = false) {
    if (isMilliseconds) {
        return value.toString().padStart(3, '0');
    } else {
        return value.toString().padStart(2, '0');
    }
}

function reset() {
    clearInterval(intervalId);
    display.textContent = '00:00:00';
    running = false;
    startStopButton.textContent = 'Start';
    startTime = undefined;
}
