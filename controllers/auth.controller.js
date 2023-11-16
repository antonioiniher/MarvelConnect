const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require('./../models/User.model')

const getRegisterForm = (req, res, next) => {
    res.render('auth/signup')
}

const postRegisterForm = (req, res, next) => {

    const { username, email, plainPassword, imageUrl, birthday, description } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(encryptedPassword => User.create({ username, email, password: encryptedPassword, imageUrl, birthday, description }))
        .then(() => res.redirect('/usuario/inicio-sesion'))
        .catch(err => next(err))

}

const getLoginForm = (req, res, next) => {
    res.render('auth/login')
}

const postLoginForm = (req, res, next) => {

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

}

const closeSession = (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
}

module.exports = {
    getRegisterForm,
    postRegisterForm,
    getLoginForm,
    postLoginForm,
    closeSession
}