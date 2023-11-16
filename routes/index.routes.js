const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')

// TODO: WAT

router.get("/", (req, res, next) => {
  User
    .findById(req.session.currentUser)
    .then(user => res.render("index", user))
    .catch(err => next(err))
})

module.exports = router
