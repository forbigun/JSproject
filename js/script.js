'use strict';

const btns = document.querySelectorAll('button');
function makeCounter() {
    let i = 0;
    return function () {
        console.log(i++);
    };
}

let counter = makeCounter();

function resetCounter() {
    btns[0].removeEventListener('mouseenter', counter);
    counter = makeCounter();
    btns[0].addEventListener('mouseenter', counter);
}

btns[0].addEventListener('mouseenter', counter);
btns[1].addEventListener('click', resetCounter);








