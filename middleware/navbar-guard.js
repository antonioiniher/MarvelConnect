const isLogged = (req, res, next) => {
    if (req.session.currentUser) {
        res.locals.userId = req.session.currentUser._id
    } else {
        res.locals.userId = null
    }
    next()
}


module.exports = {
    isLogged
}