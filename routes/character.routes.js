const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')
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
        .then(response => res.render('characters/list', {
            characters: response.data.data.results,
            isLogged: req.session.currentUser,
            isLoggedOut: !req.session.currentUser
        }))
        .catch(err => next(err))

})

router.post('/:name', (req, res, next) => {

    let { name } = req.params

    if (name.includes('%20')) {
        name.split('%20').join(' ')
    }

    User
        .findOneAndUpdate(req.session.currentUser.id, { $push: { favCharacters: name } })
        .then(() => res.redirect('/personajes'))
        .catch(err => next(err))

    console.log(name)
})





module.exports = router