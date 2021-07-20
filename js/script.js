'use strict';

let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

let lastFilm = prompt('Один из последних просмотренных фильмов?', '');
let lastFilmRating = +prompt('Как вы его оцените?', '');

personalMovieDB.movies[lastFilm] = lastFilmRating;

console.log(personalMovieDB);




