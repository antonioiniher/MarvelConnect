const marvelService = require('../services/characters.services')

const getComics = (req, res, next) => {

    marvelService
        .getAllComics()
        .then(response => {
            res.render('comics/list', {
                comics: response.data.data.results
            })
        })
        .catch(err => next(err))

}

const filterComicsByName = (req, res, next) => {

    const { name } = req.query

    if (name) {
        marvelService
            .getComicsByName(name)
            .then(response => res.render('comics/list', { comics: response.data.data.results }))
            .catch(err => next(err))
    }

}

const comicDetails = (req, res, next) => {
    const { id } = req.query

    marvelService
        .getComicsById(id)
        .then(comic => res.render("comics/detail", comic.data.data.results[0]))
        .catch(err => next(err))

}

module.exports = {
    getComics,
    filterComicsByName,
    comicDetails
}