const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkOwnerOr } = require('../middleware/route-guard')
const date = require('../utils/date')

router.get('/lista', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('user/list', { users, isLogged: req.session.currentUser, isLoggedOut: !req.session.currentUser }))
        .catch(err => next(err))

})

router.get('/:user_id', isLoggedIn, (req, res, next) => {
    let littledate
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            if (user.birthday) {
                littledate = date.formatDate(user.birthday)
            }
            res.render('user/profile', {
                user,
                littledate,
                isLogged: req.session.currentUser,
                isLoggedOut: !req.session.currentUser,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isOwner: req.session.currentUser._id === user_id && req.session.currentUser.role != 'ADMIN'
            })
        })
        .catch(err => next(err))

})

router.get("/:user_id/editar", checkOwnerOr('ADMIN'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => res.render("user/edit-profile", {
            user,
            isLogged: req.session.currentUser,
            isLoggedOut: !req.session.currentUser
        }))
        .catch(err => console.log(err))
})

router.post("/:user_id/editar", checkOwnerOr('ADMIN'), (req, res, next) => {
    const { user_id } = req.params
    const { username, email, imageUrl, birthday, description } = req.body
    User
        .findByIdAndUpdate(user_id, { username, email, imageUrl, birthday, description })
        .then(() => res.redirect("/usuario/lista"))
        .catch(err => console.log(err))
})

router.post('/:user_id/eliminar', checkRole('ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/usuario/lista'))
        .catch(err => next(err))

})

module.exports = router