const express = require("express")
const router = express.Router()

const { isLoggedIn, checkRole } = require('../middleware/route-guard')

const {
    getEventList,
    getCreateEvent,
    postCreateEvent,
    getEventDetails,
    getEditEvent,
    postEditEvent,
    deleteEvent,
    joinEvent
} = require("../controllers/event.controller")

router.get("/", isLoggedIn, getEventList)

router.get("/crear", checkRole('CREATOR', 'ADMIN'), getCreateEvent)

router.post("/crear", checkRole('CREATOR', 'ADMIN'), postCreateEvent)

router.get("/:event_id", isLoggedIn, getEventDetails)

router.get("/:event_id/editar", checkRole('CREATOR', 'ADMIN'), getEditEvent)

router.post("/:event_id/editar", checkRole('CREATOR', 'ADMIN'), postEditEvent)

router.post("/:event_id/eliminar", checkRole('ADMIN'), deleteEvent)

router.post("/:event_id/apuntarse", isLoggedIn, joinEvent)

module.exports = router