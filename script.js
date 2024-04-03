
const moviesEl = document.querySelector('.movies')
const btn_Next = document.querySelector('.btn-next')
const btn_Prev = document.querySelector('.btn-prev')
const input = document.querySelector('input')
const divModal = document.querySelector('.modal')
const imgClose = document.querySelector('.modal__close')
const h3_Modal_Title = document.querySelector('.modal__title')
const imgModal = document.querySelector('.modal__img')
const p_Modal_description = document.querySelector('.modal__description')
const div_modal__genre_average = document.querySelector('.modal__genre-average')
const div_modal_genres = document.querySelector('.modal__genres')
const div_modal_average = document.querySelector('.modal__average')
const highlight = document.querySelector('.highlight')
const a_highlight__video = document.querySelector('.highlight__video-link')
const div_highlight__video = document.querySelector('.highlight__video')
const highlight__info = document.querySelector('.highlight__info')
const highlight__title_rating = document.querySelector('.highlight__title-rating')
const highlight__title = document.querySelector('.highlight__title')
const highlight__rating = document.querySelector('.highlight__rating')
const highlight__genre_launch = document.querySelector('.highlight__genre-launch')
const highlight__genres = document.querySelector('.highlight__genres')
const highlight__launch = document.querySelector('.highlight__launch')
const highlight__description = document.querySelector('.highlight__description')



const listagemTop20Url = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR'

let primeiraPag = 0
let UltimaPag = 5
let filmes = []
let filmesDaPag = []
function top20() {
    fetch(listagemTop20Url).then((resposta) => {
        return resposta.json()
    }).then((dados) => {
        filmesDaPag = dados.results.slice(primeiraPag, UltimaPag)
        filmes = dados.results
        filmesDaPag.forEach(filme => {
            criarmovie(filme)
        });
    })
}
top20()
//sdfok

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
    const idfilme = filme.id

    img.src = './assets/estrela.svg'

    divmovie.addEventListener("click", function () {
        divModal.classList.remove("hidden")
        Modal(idfilme)

    })

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

input.addEventListener('keypress', function (event) {
    if (event.code !== "Enter") {
        return
    }
    primeiraPag = 0
    UltimaPag = 5
    if (!input.value) {

        moviesEl.innerHTML = ''
        top20()
        return

    }
    const promise = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${input.value}**`)
    promise.then(function (resposta) {
        const promisebody = resposta.json()
        promisebody.then(function (body) {

            filmesDaPag = body.results.slice(primeiraPag, UltimaPag)
            filmes = body.results
            moviesEl.innerHTML = ''
            input.value = ''
            filmesDaPag.forEach(filme => {
                criarmovie(filme)
            });
        })
    })
})

function Modal(idfilme) {
    const PromiseModal = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${idfilme}?language=pt-BR`)
    PromiseModal.then(function (resposta) {
        const Promisebody = resposta.json()
        Promisebody.then(function (body) {
            h3_Modal_Title.textContent = body.title
            imgModal.src = body.backdrop_path
            p_Modal_description.textContent = body.overview
            div_modal_average.textContent = body.vote_average
        })
    })

}
imgClose.addEventListener('click', function () {
    divModal.classList.add("hidden")
})


function endpointGeral() {
    const promiseGeral = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR`)
    promiseGeral.then(function (resposta) {
        const promisebody = resposta.json()
        promisebody.then(function (body) {
            const Objgenres = []
            body.genres.forEach(function (item) {
                Objgenres.push(item.name)
            })
            const data = new Date(body.release_date)
            const formatodeData = Intl.DateTimeFormat("pt-BR", { dateStyle: "long" })
            highlight__genres.textContent = Objgenres.join(", ")
            highlight__launch.textContent = formatodeData.format(data)
            div_highlight__video.style.backgroundImage = `url(${body.backdrop_path})`
            highlight__title.textContent = body.title
            highlight__rating.textContent = body.vote_average
            highlight__description.textContent = body.overview
        })
    })
}
endpointGeral()
function endpointVideo() {
    const PromiseVideo = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR`)
    PromiseVideo.then(function (resposta) {
        const retorno = resposta.json()
        retorno.then(function (body) {
            a_highlight__video.href = `https://www.youtube.com/watch?v=${body.results[0].key}`
        })
    })
}
endpointVideo()