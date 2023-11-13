const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')

router.get("/", (req, res, next) => {

    const { name } = req.query

    if (name) {
        marvelService
            .getCharacterByName(name)
            .then(response => res.render('characters/list', { characters: response.data.data.results }))
            .catch(err => next(err))
    }

    marvelService

        .getAllCharacters()
        .then(response => res.render('characters/list', { characters: response.data.data.results }))
        .catch(err => next(err))

})

// router.get("/", (req, res, next) => {

//     const { name } = req.body

//     marvelService
//         .getCharacterByName(name)
//         .then(response => res.render('characters/list', { characters: response.data.data.results }))
//         .catch(err => next(err))
// })

module.exports = router