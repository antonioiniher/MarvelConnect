const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')
const User = require('../models/User.model')


router.get("/", isLoggedIn, (req, res, next) => {

    marvelService
        .getAllCharacters()
        .then(response => {
            const { favCharacters } = req.session.currentUser
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

router.get('/filtroNombre', isLoggedIn, (req, res, next) => {

    const { name } = req.query

    marvelService
        .getCharacterByName(name)
        .then(response => {
            const { favCharacters } = req.session.currentUser
            const characters = response.data.data.results.map(character => {
                return {
                    ...character,
                    isFav: favCharacters.includes(character.name)
                }
            })
            res.render('characters/nameFilteredChar', { characters })
        })
        .catch(err => next(err))

})

router.get('/filtroSerie', isLoggedIn, (req, res, next) => {

    const { serie } = req.query

    marvelService
        .getCharacterBySerie(serie)
        .then(response => {
            const { favCharacters } = req.session.currentUser
            const characters = response.data.data.results.map(character => {
                return {
                    ...character,
                    isFav: favCharacters.includes(character.name)
                }
            })
            res.render('characters/serieFilteredChar', { characters })
        })
        .catch(err => next(err))

})


router.post('/', isLoggedIn, (req, res, next) => {

    let { charName } = req.body
    const { _id: userId } = req.session.currentUser

    if (charName.includes('%20')) {
        charName.split('%20').join(' ')
    }

    User
        .findById(userId)
        .then(user => {
            if (!user.favCharacters.includes(charName)) {
                req.session.currentUser.favCharacters.push(charName)
                return User.findByIdAndUpdate(userId, { $push: { favCharacters: charName } })
            } else {
                const index = req.session.currentUser.favCharacters.indexOf(charName)
                req.session.currentUser.favCharacters.splice(index, 1)
                return User.findByIdAndUpdate(userId, { $pull: { favCharacters: charName } })
            }
        })
        .then(() => res.redirect('/personajes'))
        .catch(err => next(err))

})

module.exports = router