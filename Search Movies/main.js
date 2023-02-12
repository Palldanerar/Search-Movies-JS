const API_KEY = "Your API-KEY";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const inputMovie = document.querySelector(".header__search")

async function getMovies(url) {
    await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => showMovies(data))
    .catch((e) => alert(`Ошибка - ${e}`));
}

function getColorRate(rate) {
    if (rate >= 7) {
        return "green"
    } else if (rate > 4) {
        return "orange"
    } else if (rate > 0) {
        return "red"
    } else {
        return "gray"
    }
}

function showMovies(data) {
    console.log(data)

    const moviesBlock = document.querySelector(".movies")

    moviesBlock.innerHTML = ""

    if (data.searchFilmsCountResult == 0) {
        moviesBlock.innerHTML = `<h1 class="no-search">Ничего не найдено</h1>`
    } else {
        data.films.forEach(movie => {
            const movieEl = document.createElement("div")
            movieEl.classList.add("movie")
            movieEl.innerHTML = `
            <div class="movie__cover-inner">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
                <div class="movie__cover--darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__average movie__average--${getColorRate(movie.rating)}">${movie.rating}</div>
            </div>
            `
            moviesBlock.appendChild(movieEl)
        })
    }
}

inputMovie.addEventListener("input", () => {
    const API_URL_SEARCH = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${inputMovie.value}&page=1`
    getMovies(API_URL_SEARCH);
})

getMovies(API_URL_POPULAR);
