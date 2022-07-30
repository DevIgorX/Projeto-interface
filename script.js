
const moviesEl = document.querySelector('.movies')

const listagemTop20Url = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR'



let filmes = []
fetch(listagemTop20Url).then((resposta) => {
    return resposta.json()
}).then((dados) => {
    filmes = dados.results
    filmes.forEach(filme => {
        criarmovie(filme)
    });

})


function criarmovie(filme) {

    console.log(filme.poster_path)
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

