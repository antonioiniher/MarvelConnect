const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')


router.get("/", isLoggedIn, (req, res, next) => {

    marvelService
        .getAllComics()
        .then(response => {
            res.render('comics/list', {
                comics: response.data.data.results
            })
        })
        .catch(err => next(err))

})

router.get('/filtroNombre', (req, res, next) => {

    const { name } = req.query

    if (name) {
        marvelService
            .getComicsByName(name)
            .then(response => res.render('comics/list', { comics: response.data.data.results }))
            .catch(err => next(err))
    }
})

router.get("/detalles", isLoggedIn, (req, res, next) => {
    const { id } = req.query

    marvelService
        .getComicsById(id)
        .then(comic => res.render("comics/detail", comic.data.data.results[0]))
        .catch(err => next(err))
})

module.exports = router