const elements = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

elements.start.addEventListener('click', handlerClickStart);
elements.stop.addEventListener('click', handlerClickStop);
elements.stop.disabled = true;

let intervalId;

function handlerClickStart(ev) {
  intervalId = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  ev.target.disabled = true;
  elements.stop.disabled = false;
}

function handlerClickStop(ev) {
  clearInterval(intervalId);
  elements.start.disabled = false;
  ev.target.disabled = true;
}

function getRandomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)
  );
}
