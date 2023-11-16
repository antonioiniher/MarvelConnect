const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')


router.get("/", isLoggedIn, (req, res, next) => {

    marvelService
        .getAllSeries()
        .then(response => res.render('series/list', { series: response.data.data.results }))
        .catch(err => next(err))

})

router.get("/resultados", isLoggedIn, (req, res, next) => {

    const { name } = req.query

    marvelService
        .getSeriesByName(name)
        .then(response => res.render('series/nameFilter', { series: response.data.data.results }))
        .catch(err => next(err))

})

router.get("/detalles", isLoggedIn, (req, res, next) => {
    const { id } = req.query

    marvelService
        .getSeriesById(id)
        .then(serie => console.log(serie.data.data.results))
        .catch(err => next(err))
})

module.exports = router