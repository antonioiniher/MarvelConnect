const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')

router.get("/", (req, res, next) => {

    marvelService
        .getAllCharacters()
        .then(response => res.render('characters/list', { characters: response.data.data.results }))
        .catch(err => next(err))
})



module.exports = router