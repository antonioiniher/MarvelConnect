const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('./../models/User.model')

router.get('/registro', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/registro', (req, res, next) => {

    const { username, email, plainPassword, imageUrl, birthday, description } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(encryptedPassword => User.create({ username, email, password: encryptedPassword, imageUrl, birthday, description }))
        .then(() => res.redirect('/usuario/inicio-sesion'))
        .catch(err => next(err))

})

router.get('/inicio-sesion', (req, res, next) => {
    res.render('auth/login')
})

router.post('/inicio-sesion', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Todavía no te has registrado' })
                return
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Datos incorrectos' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')

        })
        .catch(err => next(err))

})

router.get('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router