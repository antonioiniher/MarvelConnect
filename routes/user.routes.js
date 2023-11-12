const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkOwnerOr } = require('../middleware/route-guard')

router.get('/lista', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('user/list', { users, isLogged: req.session.currentUser, isLoggedOut: !req.session.currentUser }))
        .catch(err => next(err))

})

router.get('/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/profile', { user, isLogged: req.session.currentUser, isLoggedOut: !req.session.currentUser }))
        .catch(err => next(err))

})






module.exports = router