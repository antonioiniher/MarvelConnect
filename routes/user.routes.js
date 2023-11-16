const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRole, checkOwnerOr } = require('../middleware/route-guard')

const {
    userList,
    getUserById,
    getUserEdit,
    postUserEdit,
    deleteUser,
    creatorRole
} = require('../controllers/user.controller')

router.get('/lista', isLoggedIn, userList)

router.get('/:user_id', isLoggedIn, getUserById)

router.get("/:user_id/editar", checkOwnerOr('ADMIN'), getUserEdit)

router.post("/:user_id/editar", checkOwnerOr('ADMIN'), postUserEdit)

router.post('/:user_id/eliminar', checkRole('ADMIN'), deleteUser)

router.post('/:user_id/creator', checkRole('ADMIN'), creatorRole)

module.exports = router