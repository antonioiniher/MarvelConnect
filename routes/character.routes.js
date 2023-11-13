const express = require('express')
const router = express.Router()

const marvelService = require('../services/characters.services')
const { isLoggedIn } = require('../middleware/route-guard')

router.get("/", isLoggedIn, (req, res, next) => {

    marvelService
        .getAllCharacters()
        .then(response => res.render('characters/list', {
            characters: response.data.data.results,
            isLogged: req.session.currentUser,
            isLoggedOut: !req.session.currentUser
        }))
        .catch(err => next(err))

})



module.exports = router