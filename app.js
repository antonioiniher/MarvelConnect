require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

app.locals.appTitle = 'Marvel connect'

const { isLogged } = require("./middleware/navbar-guard")
app.use(isLogged)

require('./routes')(app)
require("./error-handling")(app)

module.exports = app
