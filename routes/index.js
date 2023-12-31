module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require('./auth.routes')
    app.use('/usuario', authRoutes)

    const characterRoutes = require('./character.routes')
    app.use('/personajes', characterRoutes)

    const userRoutes = require('./user.routes')
    app.use('/usuario', userRoutes)

    const eventRoutes = require('./event.routes')
    app.use('/eventos', eventRoutes)

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)

    const comicRoutes = require('./comics.routes')
    app.use('/comics', comicRoutes)

    const seriesRoutes = require('./series.routes')
    app.use('/series', seriesRoutes)

}