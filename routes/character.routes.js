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
            .then(response => {
                const favCharacters = req.session.currentUser.favCharacters
                const characters = response.data.data.results.map(character => {
                    return {
                        ...character,
                        isFav: favCharacters.includes(character.name)
                    }
                })
                res.render('characters/list', { characters })
            })
            .catch(err => next(err))
    }

    if (serie) {
        marvelService
            .getCharacterBySerie(serie)
            .then(response => {
                const favCharacters = req.session.currentUser.favCharacters
                const characters = response.data.data.results.map(character => {
                    return {
                        ...character,
                        isFav: favCharacters.includes(character.name)
                    }
                })
                res.render('characters/list', { characters })
            })
            .catch(err => next(err))
    }

    marvelService
        .getAllCharacters()
        .then(response => {
            const favCharacters = req.session.currentUser.favCharacters
            const characters = response.data.data.results.map(character => {
                return {
                    ...character,
                    isFav: favCharacters.includes(character.name)
                }
            })
            res.render('characters/list', { characters })
        })
        .catch(err => next(err))

})

router.post('/', isLoggedIn, (req, res, next) => {

    let { charName } = req.body

    if (charName.includes('%20')) {
        charName.split('%20').join(' ')
    }

    User
        .findById(req.session.currentUser._id)
        .then(user => {
            if (!user.favCharacters.includes(charName)) {
                req.session.currentUser.favCharacters.push(charName)
                User.findByIdAndUpdate(req.session.currentUser._id, { $push: { favCharacters: charName } })
                    .then(() => res.redirect('/personajes'))
                    .catch(err => next(err))
            } else {
                const index = req.session.currentUser.favCharacters.indexOf(charName)
                req.session.currentUser.favCharacters.splice(index, 1)
                User.findByIdAndUpdate(req.session.currentUser._id, { $pull: { favCharacters: charName } })
                    .then(() => res.redirect('/personajes'))
                    .catch(err => next(err))

            }
        })
        .catch(err => next(err))

})

module.exports = router