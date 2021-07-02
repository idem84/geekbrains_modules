import { diffDates, diffToHtml } from "./datecalc.js";
import { Tabs } from "./tabs.js";
import { Timer } from "./timer.js";

const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    } else
        dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}

Tabs();

let timerForm = document.getElementById('timer').getElementsByTagName('button');
const timer = new Timer();

const doTimerAction = id => {
    switch (parseInt(id)) {
        case 1:
            let seconds = document.getElementById('timer').getElementsByClassName('seconds')[0].value;
            let deadline = new Date(Date.parse(new Date()) + seconds * 1000);
            timer.initializeClock('countdown', deadline);
            document.getElementById('countdown').style.display = 'block';


            break
        case 2:
            timer.stopClock();

            break;
    }
}

for (let i = 0, len = timerForm.length; i < len; i++) {
    timerForm[i].addEventListener('click', function (e) {
        e.preventDefault();
        doTimerAction(e.target.value);
    })
}

// let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer

//let deadline = new Date(Date.parse(new Date()) + 5 * 1000);

//initializeClock('countdown', deadline);