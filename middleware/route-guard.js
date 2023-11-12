const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/usuario/inicio-sesion')
    }

}

const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    }
    else {
        res.redirect('/usuario/inicio-sesion')
    }
}

const checkOwnerOr = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser
    const { user_id } = req.params

    if (admittedRoles.includes(role) || req.session.currentUser._id === user_id) {
        next()
    } else {
        res.redirect('/usuario/inicio-sesion')
    }
}


module.exports = {
    isLoggedIn,
    checkRole,
    checkOwnerOr
}