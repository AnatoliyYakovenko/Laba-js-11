const refs = {
  startBtn: document.querySelector("[data-start]"),
  dateInput: document.querySelector("#datetime-picker"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minsEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
};
const { startBtn, dateInput, daysEl, hoursEl, minsEl, secondsEl } = refs;

let intervalId = null;
let selectedTime = Date.now();

startBtn.addEventListener("click", runTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      startBtn.disabled = true;
      return;
    }
    selectedTime = selectedDates[0].getTime();
    startBtn.disabled = false;
  },
};
flatpickr(dateInput, options);

function runTimer() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    let timerTime = selectedTime - Date.now();
    if (timerTime <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      return;
    }
    showDate(timerTime);
  }, 1000);
}

function showDate(timerTime) {
  const { days, hours, minutes, seconds } = convertMs(timerTime);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minsEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
