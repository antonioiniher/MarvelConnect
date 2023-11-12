const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
  res.render("index", { isLogged: req.session.currentUser, isLoggedOut: !req.session.currentUser })
})

module.exports = router
