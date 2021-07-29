/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const adv = document.querySelector('.promo__adv');

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


function deleteAdv() {
    adv.hidden = true;
}

function deleteAdvBlocks() {
    const advBlocks = adv.querySelectorAll('img');
    advBlocks.forEach(item => {
        item.remove();
    });
}

function changeGenre() {
    const promoGenre = document.querySelector('.promo__genre');
    promoGenre.textContent = 'драма';
}

function changeBackground() {
    const promoBg = document.querySelector('.promo__bg');
    promoBg.style.backgroundImage = 'url(img/bg.jpg)';
}

function makeMovieList() {
    const movieList = document.querySelector('.promo__interactive-list');
    const movieListElemets = movieList.querySelectorAll('.promo__interactive-item');
    const sortedMovies = [...movieDB.movies.sort()];
    movieListElemets.forEach((item, index) => {
        item.textContent = `${index + 1}) ${sortedMovies[index]}`;
    });
}

