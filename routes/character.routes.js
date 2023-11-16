const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guard')

const {
    getAllCharact,
    getFilteredByName,
    getFilteredBySerie,
    addFavChar
} = require('../controllers/characters.controller')

router.get("/", isLoggedIn, getAllCharact)

router.get('/filtroNombre', getFilteredByName)

router.get('/filtroSerie', getFilteredBySerie)

router.post('/', isLoggedIn, addFavChar)

router.get("/detalles", isLoggedIn, (req, res, next) => {
    const { id } = req.query

    marvelService
        .getCharacterById(id)
        .then(character => res.render("characters/detail", character.data.data.results[0]))
        .catch(err => next(err))
})

module.exports = router