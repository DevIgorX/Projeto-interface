
const moviesEl = document.querySelector('.movies')
const btn_Next = document.querySelector('.btn-next')
const btn_Prev = document.querySelector('.btn-prev')

const listagemTop20Url = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR'

let primeiraPag = 0
let UltimaPag = 5
let filmes = []
let filmesDaPag = []

fetch(listagemTop20Url).then((resposta) => {
    return resposta.json()
}).then((dados) => {
    filmesDaPag = dados.results.slice(primeiraPag, UltimaPag)
    filmes = dados.results
    console.log(filmes)
    filmesDaPag.forEach(filme => {

        criarmovie(filme)


    });

})

btn_Next.addEventListener('click', function () {
    if (primeiraPag > filmes.length - 6) {
        primeiraPag = 0
        UltimaPag = 5

    } else {
        primeiraPag += 5
        UltimaPag += 5
    }
    filmesDaPag = filmes.slice(primeiraPag, UltimaPag)
    moviesEl.innerHTML = ''
    filmesDaPag.forEach(filme => {

        criarmovie(filme)

    });
})
btn_Prev.addEventListener('click', function () {
    if (primeiraPag == 0) {
        primeiraPag = filmes.length - 5
        UltimaPag = filmes.length

    } else {
        primeiraPag -= 5
        UltimaPag -= 5
    }
    filmesDaPag = filmes.slice(primeiraPag, UltimaPag)
    moviesEl.innerHTML = ''
    filmesDaPag.forEach(filme => {

        criarmovie(filme)

    });
})

function criarmovie(filme) {

    const divmovie = document.createElement('div')
    const divMovieInfor = document.createElement('div')
    const movie_title = document.createElement('span')
    const movie_rating = document.createElement('span')
    const img = document.createElement('img')

    img.src = './assets/estrela.svg'

    divmovie.classList.add('movie')
    divmovie.style.backgroundImage = `url(${filme.poster_path})`
    divMovieInfor.classList.add('movie__info')
    movie_title.classList.add('movie__title')
    movie_title.textContent = filme.title
    movie_rating.classList.add('movie__rating')
    movie_rating.textContent = filme.vote_average
    movie_rating.append(img)
    divMovieInfor.append(movie_title, movie_rating)
    divmovie.append(divMovieInfor)
    moviesEl.append(divmovie)
}





