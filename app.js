
window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#reset').onclick = reset;
}

let audio; 
let audioInterval; 

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    audio = new Audio('audio.mp3'); 

    const stop = document.querySelector('#stop');
    const endTime = new Date(date + " " + time);

    const interval = setInterval(() => calculateTime(endTime), 1000);

    stop.addEventListener('click', () => {
        clearInterval(interval);
        stopAudio();
    });
}

function calculateTime(endTime) {
    const currentTime = new Date();
    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    if (endTime > currentTime) {
        const timeLeft = (endTime - currentTime) / 1000;

        days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
        minutes.innerText = Math.floor((timeLeft / 60) % 60);
        seconds.innerText = Math.floor(timeLeft % 60);

    } else {
        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;

        if (audio) {
            audio.play();
            audioInterval = setInterval(() => {
                if (audio.ended) {
                    clearInterval(audioInterval);
                }
            }, 100);
        }
    }
}

function stopAudio() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(audioInterval);
    }
}

function reset() {
    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    days.innerText = 0;
    hours.innerText = 0;
    minutes.innerText = 0;
    seconds.innerText = 0;

    stopAudio();
}

