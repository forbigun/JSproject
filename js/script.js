/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/


// Код возьмите из предыдущего домашнего задания

'use strict';

let numberOfFilms;

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: true
};

(function start() {
    /*     do {
            numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
        while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms));
    
        personalMovieDB.count = numberOfFilms;
    
        rebemberMyMovies();
    
        detectPersonalLevel(); */

    writeYourGenres(personalMovieDB);
    console.log(personalMovieDB);
})();



function writeYourGenres() {
    for (let i = 0; i < 3; i++) {
        const result = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
        if (result != null || result.trim()) {
            personalMovieDB.genres[i] = result;
        }
    }

}

function showMyDB(movieDb) {
    if (movieDb.privat) {
        console.log(movieDb);
    }
}

function rebemberMyMovies() {
    for (let i = 0; i < 2; i++) {
        const a = prompt('Один из последних просмотренных фильмов?', ''),
            b = prompt('На сколько оцените его?', '');

        if (a != null && b != null && a != '' && b != '' && a.length < 50) {
            personalMovieDB.movies[a] = b;
            console.log('done');
        } else {
            console.log('error');
            i--;
        }
    }
}

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log("Вы классический зритель");
    } else if (personalMovieDB.count >= 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}
