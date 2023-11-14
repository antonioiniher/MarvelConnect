const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn, checkOwnerOr } = require('../middleware/route-guard')
const User = require('../models/User.model')


router.get("/", isLoggedIn, (req, res, next) => {

    const { name, serie } = req.query


    if (name) {
        marvelService
            .getCharacterByName(name)
            .then(response => res.render('characters/list', { characters: response.data.data.results }))
            .catch(err => next(err))
    }

    if (serie) {
        marvelService
            .getCharacterBySerie(serie)
            .then(response => res.render('characters/list', { characters: response.data.data.results }))
            .catch(err => next(err))
    }

    marvelService
        .getAllCharacters()
        .then(response => res.render('characters/list', { characters: response.data.data.results }))
        .catch(err => next(err))

})

router.post('/', checkOwnerOr, (req, res, next) => {

    let { nombre } = req.body

    if (nombre.includes('%20')) {
        nombre.split('%20').join(' ')
    }

    User
        .findOneAndUpdate(req.session.currentUser.id, { $push: { favCharacters: nombre } })
        .then(() => res.redirect('/personajes'))
        .catch(err => next(err))


})






module.exports = router