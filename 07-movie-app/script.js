const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query='

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'

const getClassByRate = (vote) => {
    return vote >= 8 ? 'green' : vote > 5 ? 'orange' : 'red'
}

const showMovies = (movies) => {
    const $main = document.querySelector('#movies')
    $main.innerHTML = ''

    movies.forEach(movie => {
        const $movie = document.createElement('div')

        const {
            backdrop_path,
            overview,
            poster_path,
            title,
            vote_average
        } = movie

        const image = poster_path || backdrop_path

        $movie.classList.add('movie')

        $movie.innerHTML = `
            <img src="${IMAGE_PATH + image}" alt="${title}">

            <div class="movie__info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="movie__overview">
                <h4>Overview</h4>
                <p>${overview}</p>
            </div>
        `

        $main.appendChild($movie)
    })
}

const getMovies = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
    
        showMovies(data.results)
    }
    catch (e) {
        console.error(e)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const $searchForm = document.querySelector('#searchForm')

    $searchForm.addEventListener('submit', async (evt) => {
        evt.preventDefault()

        const $searchInput = document.querySelector('#searchInput')
        const searchTerm = $searchInput.value

        if (searchTerm) {
            getMovies(SEARCH_URL + searchTerm)
            $searchInput.value = ''
        }
    })
})

getMovies(API_URL)
