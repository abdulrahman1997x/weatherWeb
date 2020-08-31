const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('.msg1');
const msg2 = document.querySelector('.msg2');



weatherForm.addEventListener('submit',  (e) =>{
  e.preventDefault();
  let val = input.value
  msg1.innerText  ='looding...'
  msg2.innerText = ''

  fetch(`/weather?address=${val}`)
  .then((res) => res.json())
  .then(data => {
    if(data.error) {
      return msg1.innerText  = data.error

    }
    msg1.innerText  = data.location
    msg2.innerText = data.forecast
  })})

