require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

app.locals.appTitle = 'Marvel'

const { updateUserInfo } = require("./middleware/user-local-update")
app.use(updateUserInfo)

require('./routes')(app)
require("./error-handling")(app)

module.exports = app