'use strict';
let isCycleEnded;

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

do {

    let lastFilm = prompt('Один из последних просмотренных фильмов?', '');
    if (lastFilm.length === 0 || !lastFilm.trim()) {
        continue;
    }
    let lastFilmRating = +prompt('Как вы его оцените?', '');

    personalMovieDB.count += 1;

    personalMovieDB.movies[lastFilm] = lastFilmRating;

    isCycleEnded = confirm("Вы закончили?");
}
while (!isCycleEnded);

console.log(personalMovieDB);








