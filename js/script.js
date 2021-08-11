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

    const modalTimerId = setTimeout(() => {
        showModalWindow(modal);
    }, 50000);

    document.addEventListener('click', (e) => {
        if (e.target.dataset.modal) {
            showModalWindow(modal);
        }
    });

    function hideModalWindow(modalWindow) {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    function showModalWindow(modalWindow) {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function showModalDialog(modalDialog) {
        modalDialog.classList.add('show');
        modalDialog.classList.remove('hide');
    }

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
            showModalWindow(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // CARDS sfs

    class Card {
        constructor(title, description, price, currency, image, ...classes) {
            this.title = title;
            this.description = description;
            this.price = price;
            this.image = image;
            this.currency = currency;
            this.classes = classes;
        }

        setCard(parentSelector) {
            const menuItem = document.createElement('div');
            if (!this.classes.length) {
                this.classes = "menu__item";
                menuItem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => menuItem.classList.add(className));
            }
            menuItem.innerHTML = `
                <img src="${this.image}" alt="vegy">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
                </div>
            `;
            document.querySelector(parentSelector).append(menuItem);
        }
    }

    const card = new Card(
        'Меню "КЕК"',
        'Это кековое меню!',
        '666',
        'руб',
        'img/tabs/vegy.jpg',
    );
    card.setCard('.menu .container');

    // form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы с Вами связажемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(i => {
        postData(i);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('message');
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php1', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
                .then(data => data.text())
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
});