module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require('./auth.routes')
    app.use('/usuario', authRoutes)

    const characterRoutes = require('./character.routes')
    app.use('/personajes', characterRoutes)

    const userRoutes = require('./user.routes')
    app.use('/usuario', userRoutes)

}