import { DateTime } from "./luxon/luxon.js"; // 1

export class DateCalc {
    constructor(formId, resultId) {
        this.dateCalcForm = document.getElementById(formId);
        this.dateCalcResult = document.getElementById(resultId);

        this.addEvent();
    }

    diffDates(firstDate, secondDate) {
        firstDate = DateTime.fromISO(firstDate);
        secondDate = DateTime.fromISO(secondDate);

        if (firstDate > secondDate)
            secondDate = [firstDate, firstDate = secondDate][0]; // 2

        return secondDate.diff(firstDate, ['years', 'months', 'days']).toObject();
    }

    diffToHtml = diff => `
        <span> 
            ${diff.years ? 'Лет: ' + diff.years : ''} 
            ${diff.months ? 'Месяцев: ' + diff.months : ''} 
            ${diff.days ? 'Дней: ' + diff.days : ''}
        </span>`;

    handleCalcDates = event => {
        event.preventDefault();

        this.clearResult();

        let { firstDate, secondDate } = event.target.elements;
        firstDate = firstDate.value, secondDate = secondDate.value;

        if (firstDate && secondDate) {
            const diff = this.diffDates(firstDate, secondDate); // 3
            this.dateCalcResult.innerHTML = this.diffToHtml(diff); // 4
        } else
            this.dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
    }

    addEvent = () => {
        this.dateCalcForm.addEventListener("submit", this.handleCalcDates);
    }

    clearResult = () => {
        this.dateCalcResult.innerHTML = "";
    }
}