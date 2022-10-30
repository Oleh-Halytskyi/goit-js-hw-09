let getEl = selector => document.querySelector(selector)
const body = getEl('body')
let interval = null;

const buttonStart = getEl('button[data-start]');
const buttonStop = getEl('button[data-stop]');

buttonStop.setAttribute("disabled",'');

buttonStart.addEventListener('click', intervalChangeColor);
buttonStop.addEventListener('click', intervalDeleteClick);

function changeBodyColor(value) {
    body.style.backgroundColor = value; 
}

let bodyColor = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function intervalChangeColor() {
      interval = setInterval(() => {
        changeBodyColor(bodyColor())
      }, 1000);
    buttonStart.setAttribute("disabled", '');
    buttonStop.removeAttribute("disabled");
}
    
function intervalDeleteClick() {
    clearInterval(interval);
    buttonStop.setAttribute("disabled", '');
    buttonStart.removeAttribute("disabled");
}