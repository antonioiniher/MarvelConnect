const User = require('./../models/User.model')
const dateUtils = require('../utils/date')


const userList = (req, res, next) => {

    User
        .find()
        .then(users => res.render('user/list', { users }))
        .catch(err => next(err))

}

const getUserById = (req, res, next) => {

    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            const formattedDate = user.birthday ? dateUtils.formatDate(user.birthday) : undefined
            res.render('user/profile', {
                user,
                formattedDate,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isOwner: req.session.currentUser._id === user_id && req.session.currentUser.role != 'ADMIN'
            })
        })
        .catch(err => next(err))

}

const getUserEdit = (req, res, next) => {

    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            const formattedDate = user.birthday ? dateUtils.formatDate(user.birthday) : undefined
            res.render("user/edit-profile", { user, formattedDate })
        })
        .catch(err => console.log(err))
}

const postUserEdit = (req, res, next) => {
    const { user_id } = req.params
    const { username, email, imageUrl, birthday, description } = req.body
    User
        .findByIdAndUpdate(user_id, { username, email, imageUrl, birthday, description })
        .then(() => res.redirect("/usuario/lista"))
        .catch(err => console.log(err))

}

const deleteUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/usuario/lista'))
        .catch(err => next(err))

}

const creatorRole = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: 'CREATOR' })
        .then(() => res.redirect(`/usuario/${user_id}`))
        .catch(err => next(err))

}

module.exports = {
    userList,
    getUserById,
    getUserEdit,
    postUserEdit,
    deleteUser,
    creatorRole
}