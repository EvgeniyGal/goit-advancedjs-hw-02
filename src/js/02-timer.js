import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

let selectedDatatime;
let intervalId;

elements.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      iziToast.error({
        title: 'Alert',
        message: 'Please choose a date in the future',
        position: 'center',
      });
      elements.btn.disabled = true;
    } else {
      selectedDatatime = selectedDates[0];
      elements.btn.disabled = false;
    }
  },
};

flatpickr(elements.input, options);

elements.btn.addEventListener('click', handlerClickStart);

function handlerClickStart(ev) {
  intervalId = setInterval(
    () => setDataToTextfield(selectedDatatime.getTime() - new Date().getTime()),
    1000
  );
  ev.target.disabled = true;
}

function setDataToTextfield(ms) {
  if (ms > 0) {
    const data = convertMs(ms);
    elements.daysField.textContent = addLeadingZero(data.days);
    elements.hoursField.textContent = addLeadingZero(data.hours);
    elements.minutesField.textContent = addLeadingZero(data.minutes);
    elements.secondsField.textContent = addLeadingZero(data.seconds);
  } else {
    clearInterval(intervalId);
  }
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
  return ('' + value).padStart(2, 0);
}
