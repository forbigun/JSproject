/**
 * Рассчитывает оставшееся время от текущего времени по местной локали
 * @param {*} endtime Дедлайн
 * @returns Объект со значениями (оставшееся время до дедлайна) 
 * для всех единиц измерения времени
 */
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.now();
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60) % 24));
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}



/**
 * Устанавливает таймер до указанного дедлайна.
 * @param {*} timerSelector Селектор таймера
 * @param {*} endtime Дедлайн
 * @param {*} daysSelector Селектор элемента для показа дней
 * @param {*} hoursSelector Селектор элемента для показа часов
 * @param {*} minutesSelector Селектор элемента для показа минут
 * @param {*} secondsSelector Селектор элемента для показа секунд
 */
function setClock(timerSelector, endtime, daysSelector,
    hoursSelector, minutesSelector, secondsSelector) {

    const timer = document.querySelector(timerSelector);
    const days = timer.querySelector(daysSelector);
    const hours = timer.querySelector(hoursSelector);
    const minutes = timer.querySelector(minutesSelector);
    const seconds = timer.querySelector(secondsSelector);

    updateClock();

    const timerInterval = setInterval(updateClock, 1000);

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;

        if (t.total <= 0) {
            clearInterval(timerInterval);
        }
    }

}

function getZero(number) {
    if (number >= 0 && number < 10) {
        return `0${number}`;
    }
    else {
        return number;
    }
}


export { setClock, getTimeRemaining, getZero };
