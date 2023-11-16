const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')


router.get("/", isLoggedIn, (req, res, next) => {

    const { name } = req.query

    if (name) {
        marvelService
            .getComicsByName(name)
            .then(response => res.render('comics/list', { comics: response.data.data.results }))
            .catch(err => next(err))
    }

    marvelService
        .getAllComics()
        .then(response => {
            res.render('comics/list', {
                comics: response.data.data.results
            })
        })
        .catch(err => next(err))

})

module.exports = router