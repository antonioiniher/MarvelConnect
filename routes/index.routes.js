const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')

router.get("/", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .then(user => res.render("index", user))
    .catch(err => next(err))

})

module.exports = router
