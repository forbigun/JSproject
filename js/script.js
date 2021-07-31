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
});