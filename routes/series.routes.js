const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')


// TODO: DESACOPLAR RESULTADOS
router.get("/", isLoggedIn, (req, res, next) => {

    const { name } = req.query

    if (name) {
        marvelService
            .getSeriesByName(name)
            .then(response => res.render('series/list', { series: response.data.data.results }))
            .catch(err => next(err))
    }

    marvelService
        .getAllSeries()
        .then(response => res.render('series/list', { series: response.data.data.results }))
        .catch(err => next(err))

})

router.get("/id", isLoggedIn, (req, res, next) => {
    const { id } = req.query
    marvelService
        .getSeriesById(id)
        .then(serie => res.render("series/detail", serie))
        .catch(err => next(err))
})

module.exports = router