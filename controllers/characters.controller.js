const marvelService = require('../services/characters.services')
const User = require('../models/User.model')

const getAllCharact = (req, res, next) => {

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
}

const getFilteredByName = (req, res, next) => {

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
}

const getFilteredBySerie = (req, res, next) => {

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
}

const addFavChar = (req, res, next) => {

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

}


module.exports = {
    getAllCharact,
    getFilteredByName,
    getFilteredBySerie,
    addFavChar
}