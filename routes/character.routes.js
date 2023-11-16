const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guard')

const {
    getAllCharact,
    getFilteredByName,
    getFilteredBySerie,
    addFavChar,
    viewDetails
} = require('../controllers/characters.controller')

router.get("/", isLoggedIn, getAllCharact)

router.get('/filtroNombre', getFilteredByName)

router.get('/filtroSerie', getFilteredBySerie)

router.post('/', isLoggedIn, addFavChar)

router.get("/detalles", isLoggedIn, viewDetails)

module.exports = router