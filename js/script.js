window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');



    let activeTab = 0;

    (function hideTabContentAndShowOnlyOne() {
        hideTabContent();
        showTabContent(activeTab);
    }());



    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(index) {
        tabsContent[activeTab].classList.add('hide');
        tabsContent[activeTab].classList.remove('show', 'fade');
        tabs[activeTab].classList.remove('tabheader__item_active');

        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');

        activeTab = index;
    }

    tabsParent.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tabheader__item')) {
            return 1;
        }

        let index = -1;

        tabs.forEach((item, i) => {
            if (item === e.target) {
                index = i;
                showTabContent(index);
                return 0;
            }
        });
    });


    //timer

    const deadline = '2021-11-20';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.now();
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        }
        else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        updateClock();

        const timerInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', deadline);



    // Modal

    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');

    const modalTimerId = setTimeout(() => {
        showModalWindow(modal);
    }, 5000);

    document.addEventListener('click', (e) => {
        if (e.target.dataset.modal) {
            showModalWindow(modal);
        }
    });

    function hideModalWindow(modalWindow) {
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModalWindow(modalWindow) {
        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModalWindow(modal);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModalWindow(e.target);
        }
    });

    closeModal.addEventListener('click', () => {
        hideModalWindow(modal);
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
            showModalWindow(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // CARDS hmm
});