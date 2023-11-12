import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(ev) {
  ev.preventDefault();

  const formData = [...ev.target.elements]
    .filter(el => el.nodeName === 'INPUT')
    .reduce((acc, el) => {
      if (el.name) {
        acc[el.name] = Number.parseInt(el.value);
      }
      return acc;
    }, {});

  ev.target.reset();

  for (let i = 1; i <= formData.amount; i++) {
    createPromise(i, formData.delay)
      .then(data => {
        showMassage(data, true);
      })
      .catch(data => {
        showMassage(data, false);
      });

    formData.delay += formData.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function showMassage({ position, delay }, isResolved) {
  iziToast.info({
    timeout: delay,
    position: 'topRight',
    icon: null,
    title: isResolved ? '✅' : '❌',
    color: isResolved ? 'green' : 'red',
    message: `Rejected promise ${position} in ${delay}ms`,
  });
}
