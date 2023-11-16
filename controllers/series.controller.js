const marvelService = require('../services/characters.services')

const getAllSeries = (req, res, next) => {

    marvelService
        .getAllSeries()
        .then(response => res.render('series/list', { series: response.data.data.results }))
        .catch(err => next(err))

}

const getSeriesResult = (req, res, next) => {

    const { name } = req.query

    marvelService
        .getSeriesByName(name)
        .then(response => res.render('series/nameFilter', { series: response.data.data.results }))
        .catch(err => next(err))

}

const getSeriesDetails = (req, res, next) => {
    const { id } = req.query

    marvelService
        .getSeriesById(id)
        .then(serie => res.render("series/detail", serie.data.data.results[0]))
        .catch(err => next(err))

}

module.exports = {
    getAllSeries,
    getSeriesResult,
    getSeriesDetails
}