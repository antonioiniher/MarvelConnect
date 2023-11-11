const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')

router.get('/perfil', (req, res, next) => {

    res.render('user/your-profile', { user: req.session.currentUser })

})

router.get('/lista', (req, res, next) => {

    User
        .find()
        .then(users => res.render('user/list', { users }))
        .catch(err => next(err))

})


router.get('/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/profile'))
        .catch(err => next(err))

})






module.exports = router