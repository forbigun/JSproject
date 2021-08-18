
function hideModalWindow(modalWindow) {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function showModalWindow(modalWindow, modalTimerId) {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modalAction(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const modalTrigger = document.querySelector(triggerSelector);


    document.addEventListener('click', (e) => {
        if (e.target === modalTrigger) {
            showModalWindow(modal, modalTimerId);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModalWindow(modal);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModalWindow(modal);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
            showModalWindow(modal, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}


export default modalAction;
export { hideModalWindow, showModalWindow };