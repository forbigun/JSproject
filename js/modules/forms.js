import { hideModalWindow, showModalWindow } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalSelector) {
    const forms = document.querySelectorAll(formSelector);
    const modal = document.querySelector(modalSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы с Вами связажемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(i => {
        bindPostData(i);
    });

    function showModalDialog(modalDialog) {
        modalDialog.classList.add('show');
        modalDialog.classList.remove('hide');
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('message');
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModalWindow(modal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            showModalDialog(prevModalDialog);
            hideModalWindow(modal);
        }, 2000);
    }
}

export default forms;