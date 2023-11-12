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





router.get("/:user_id/editar", (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => res.render("user/edit-profile", user))
        .catch(err => console.log(err))
})

router.post("/:user_id/editar", (req, res, next) => {
    const { user_id } = req.params
    const { username, email, imageUrl, birthday, description } = req.body
    User
        .findByIdAndUpdate(user_id, { username, email, imageUrl, birthday, description })
        .then(res.redirect("/usuario/lista"))
        .catch(err => console.log(err))
})




router.post('/:user_id/eliminar', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('user/list'))
        .catch(err => next(err))
})

module.exports = router