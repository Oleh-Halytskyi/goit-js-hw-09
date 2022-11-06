import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector)
let getEls = selector => document.querySelectorAll(selector)
getEl('#datetime-picker').style.width = '200px';
getEl('.timer').style.display = 'flex';
getEl('.timer').style.width = '250px';
getEl('.timer').style.justifyContent = 'space-between';
getEls('span').forEach(el => el.style.display = 'block')
getEls('span').forEach(el => el.style.textAlign = 'center')
getEls('.value').forEach(el => el.style.fontSize = '34px')


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
         if (calendar.selectedDates[0].getTime() > date.getTime()) {
            buttonStart.removeAttribute('disabled');
            return
        }
        Notiflix.Notify.failure('Please choose a date in the future');
    },
};
const calendar = flatpickr('#datetime-picker', options)
const buttonStart = getEl('button[data-start]')
const date = new Date()

buttonStart.setAttribute("disabled", '');
buttonStart.addEventListener('click', startTimer);




function startTimer() {


    const setID = setInterval(() => {

        if ((calendar.selectedDates[0].getTime() - date.getTime()) <= 0) {
        getEl('span[data-days]').textContent = "00";
        getEl('span[data-hours]').textContent = '00';
        getEl('span[data-minutes]').textContent = '00';
        getEl('span[data-seconds]').textContent = '00';

        buttonStart.setAttribute("disabled", '');
        clearInterval(setID);
        return
        }
        
        const actualTime = new Date()
        
        let { days, hours, minutes, seconds } = convertMs(calendar.selectedDates[0].getTime() - actualTime.getTime()); 
        console.log(days);
        
        getEl('span[data-days]').textContent = addLeadingZero(days);
        getEl('span[data-hours]').textContent = addLeadingZero(hours);
        getEl('span[data-minutes]').textContent = addLeadingZero(minutes);
        getEl('span[data-seconds]').textContent = addLeadingZero(seconds);
        
        if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
         clearInterval(setID)
        };
    }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
     return value.toString().padStart(2, '0')
}
