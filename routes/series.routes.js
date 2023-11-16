const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guard')
const { getAllSeries, getSeriesResult, getSeriesDetails } = require('../controllers/series.controller')

router.get("/", isLoggedIn, getAllSeries)

router.get("/resultados", isLoggedIn, getSeriesResult)

router.get("/detalles", isLoggedIn, getSeriesDetails)

module.exports = router