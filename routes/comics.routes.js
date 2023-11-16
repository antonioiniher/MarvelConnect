const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guard')
const { getComics, filterComicsByName, comicDetails } = require('../controllers/comics.controller')


router.get("/", isLoggedIn, getComics)

router.get('/filtroNombre', isLoggedIn, filterComicsByName)

router.get("/detalles", isLoggedIn, comicDetails)

module.exports = router