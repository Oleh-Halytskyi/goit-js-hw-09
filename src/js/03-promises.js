import Notiflix from 'notiflix';
let getEl = selector => document.querySelector(selector)

const form = getEl('.form')
let firstDelay = null;
let step = null;
let amount = null;
let delay = null;
let position = 1;


form.onsubmit = async (evt) => {
  evt.preventDefault();

  let formData = new FormData(form);
  firstDelay = Number(formData.get('delay'))
  step = Number(formData.get('step'))
  amount = Number(formData.get('amount'))
  
  delay = firstDelay;
  
  for (let i = 1; i <= amount; i += 1) {

    createPromise(i, delay).then(( position, delay) => {
      (Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
    })
    .catch((position, delay) => {
      (Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    })
    .finally(() => {
        form.reset();
        firstDelay = null;
        step = null;
        amount = null
      })
    
    delay += step;
   }
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
    })
}