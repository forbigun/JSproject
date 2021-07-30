/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против всех"
    ]
};

const adv = document.querySelector('.promo__adv');
const formAdd = document.querySelector('.add');
const movieInput = document.querySelector('.add > .adding__input');
const formAddButton = document.querySelector('.add button');
const movieList = document.querySelector('.promo__interactive-list');
const movieListElemets = movieList.querySelectorAll('.promo__interactive-item');
const checkbox = formAdd.querySelector('[type="checkbox"]');
const promoBg = document.querySelector('.promo__bg');
const advBlocks = adv.querySelectorAll('img');

document.addEventListener('DOMContentLoaded', () => {
    deleteAdvBlocks(advBlocks);
    changeGenre();
    changeBackground(promoBg);
    buildMovieList(movieDB.movies, movieList);
});

formAdd.addEventListener('submit', event => {
    event.preventDefault();
    if (movieDB.movies
        .map(film => film.toLowerCase())
        .indexOf(movieInput.value.trim().toLowerCase()) > -1) {
        console.log('Такой фильм уже есть в коллекции!');
        return;
    }
    if (movieInput.value.length !== 0 && movieInput.value.length < 50 && movieInput.value.trim()) {
        if (checkbox.checked) {
            console.log('Добавляем любимый фильм!');
        }
        const movie = validateMovieLength(movieInput.value);
        movieDB.movies.push(movie);
        buildMovieList(movieDB.movies, movieList);
    }
    event.target.reset();
});

function validateMovieLength(movie) {
    return movie.length < 22 ? movie
        : movie.slice(0, 21).padEnd(24, '.');
}

function deleteAdvBlocks(element) {
    element.forEach(item => {
        item.remove();
    });
}

function changeGenre() {
    const promoGenre = document.querySelector('.promo__genre');
    promoGenre.textContent = 'драма';
}

function changeBackground(element) {
    element.style.backgroundImage = 'url(img/bg.jpg)';
}

function buildMovieList(movies, parent) {
    parent.innerHTML = '';
    movies.sort(compareStringsWithoutCaseInfluence);
    movies.forEach((movie, index) => {
        parent.innerHTML += `
        <li class="promo__interactive-item"> ${index + 1}) ${validateMovieLength(movie)}
            <div class="delete"></div>
        </li>
        `;
    });

    document.querySelectorAll('.delete')
        .forEach((item, index) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                movieDB.movies.splice(index, 1);

                buildMovieList(movies, parent);
            });
        });
}

function compareStringsWithoutCaseInfluence(firstString, secondString) {
    const first = firstString.toLowerCase();
    const second = secondString.toLowerCase();
    if (first > second) {
        return 1;
    }
    if (first < second) {
        return -1;
    }
    return 0;
}
