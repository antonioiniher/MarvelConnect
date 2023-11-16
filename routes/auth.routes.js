const express = require('express')
const router = express.Router()

const {
    getRegisterForm,
    postRegisterForm,
    getLoginForm,
    postLoginForm,
    closeSession
} = require('../controllers/auth.controller')

router.get('/registro', getRegisterForm)

router.post('/registro', postRegisterForm)

router.get('/inicio-sesion', getLoginForm)

router.post('/inicio-sesion', postLoginForm)

router.get('/cerrar-sesion', closeSession)

module.exports = router