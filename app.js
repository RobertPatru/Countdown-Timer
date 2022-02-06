const containerInputs = document.querySelector('.container_inputs');
const containerCounthdown = document.querySelector('.container_countdown');

const eventName = document.querySelector('.event_name');
const eventNameInput = document.querySelector('.event_name_input');
const eventTimeInput = document.querySelector('.event_time_input');

const startBtn  = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
let stopTimer = false;
let theInterval;


resetBtn.addEventListener('click', () => {
    console.log('se actioveaza');
    clearInterval(theInterval); 
    eventNameInput.value = '';
    eventTimeInput.value = '';

    years = 0;
    months = 0;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    containerInputs.style.display = "block";

    // if an element doesn't have position z-index does not work
    containerInputs.style = "position:auto";
    startBtn.style.display = "block";

    containerCounthdown.style.display = "none";

    eventName.style.display = "none";
    resetBtn.style.display = "none";
});

startBtn.addEventListener('click', () => { 
    verifyInput();
    
});

function verifyInput() {
    let today = new Date();
    let eventDay = new Date(eventTimeInput.value);

    // if the event name or event date values are incorrect their border becomes red
    if (/\S/.exec(eventNameInput.value) != null && today != eventDay && eventDay > today) {   
        eventName.textContent = eventNameInput.value;

        containerInputs.style.display = "none";
        startBtn.style.display = "none";
        containerCounthdown.style.display = "flex";
        eventName.style.display = "block";
        resetBtn.style.display = "block";

        moveTimer();
        theInterval = setInterval(moveTimer, 1000);     
    }
    else {
        eventNameInput.style.border = '2px red solid';
        eventTimeInput.style.border = '2px red solid';

        setTimeout(() => {
            eventNameInput.style.border = 'none';
             eventTimeInput.style.border = 'none';
        }, 2000);
    }
}

function moveTimer() {
    let today = new Date();
    let eventDay = new Date(eventTimeInput.value);
 
    const totalSeconds = (eventDay - today) / 1000;
    const totalMiliSeconds = Math.floor(eventDay.getTime() - today.getTime());
    const miliSecondsInADay = 1000 * 60 * 60 * 24;
    
   
    let days = Math.floor(totalMiliSeconds / miliSecondsInADay);
    let days2;
    const months = Math.floor(days / 31);
    let months2;
    const years = Math.floor(months / 12);
    

    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    
    // DAYS ###########################################
    if (eventDay.getDate() > today.getDate()) {     // if the day of event is higher than today
        days2 = eventDay.getDate() - today.getDate() - 1;
    }
    else if (eventDay.getDate() < today.getDate()) {  // if the day of event is lowe then today
        days2 = days % 30;
        console.log(days2, 'if 2 days');
    } else if (eventDay.getDate() == today.getDate()) {
        days2 = 0;
    }
    
    console.log(eventDay.getMonth(), today.getMonth());
    // MONTHS ###########################################
    if (eventDay.getMonth() > today.getMonth()) {     // if the day of event is higher than today
        months2 = eventDay.getMonth() - today.getMonth() - 1;
        console.log('if 1', months2, eventDay.getMonth(), today.getMonth());

    }
    else if (eventDay.getMonth() < today.getMonth()) {  // if the day of event is lowe then today
        months2 = 11 - today.getMonth();
        console.log('if 2');
    } else if (eventDay.getMonth() == today.getMonth()) {
        months2 = 0;
    }


    if (years == 0 && months == 0 && days == 0 && hours == 0 && seconds == 0) {
        clearInterval(theInterval);      // stop the timer count
        const audio = new Audio('/sound/mixkit-score-casino-counter-1998.wav');     
        audio.play();     // play a sound
    }

 
    document.querySelector('.years__number').textContent = years;    
    document.querySelector('.months__number').textContent = months2;    
    document.querySelector('.days__number').textContent = days2;    
    document.querySelector('.hours__number').textContent = hours;    
    document.querySelector('.minutes__number').textContent = minutes;    
    document.querySelector('.seconds__number').textContent = seconds;    
}