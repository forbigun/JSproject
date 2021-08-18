import { getResource } from '../services/services';


function cards() {
    class Card {
        constructor(title, description, price, currency, image, ...classes) {
            this.title = title;
            this.description = description;
            this.price = price;
            this.image = image;
            this.currency = currency || 'руб';
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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ title, descr, price, currency, img }) =>
                new Card(title, descr, price, currency, img)
                    .setCard('.menu .container'));
        });
}

export default cards;