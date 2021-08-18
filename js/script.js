import tabs from './modules/tabs';
import modalAction from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';
import { setClock as timer } from './modules/timer';
import { showModalWindow } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() =>
        showModalWindow(document.querySelector('.modal'), modalTimerId),
        5000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modalAction('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-11-20', '#days', '#hours', '#minutes', '#seconds');
    cards();
    forms('form', '.modal');
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
