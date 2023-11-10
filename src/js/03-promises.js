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
      .then(({ position, delay }) => {
        iziToast.info({
          timeout: delay,
          position: 'topRight',
          icon: null,
          title: '✅',
          color: 'green',
          message: `Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.info({
          timeout: delay,
          position: 'topRight',
          icon: null,
          title: '❌',
          color: 'red',
          message: `Rejected promise ${position} in ${delay}ms`,
        });
      });

    formData.delay += formData.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise(res =>
      setTimeout(() => res({ position, delay }), delay)
    );
  } else {
    return new Promise((_, rej) =>
      setTimeout(() => rej({ position, delay }), delay)
    );
  }
}
