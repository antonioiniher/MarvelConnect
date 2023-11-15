const express = require("express")
const router = express.Router()

const Event = require("../models/Event.model")
const User = require("../models/User.model")

const date = require('../utils/date')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get("/", isLoggedIn, (req, res, next) => {
    Event
        .find()
        .then(events => {
            res.render("events/list", {
                events,
                isAdminOrCreator: req.session.currentUser.role === 'ADMIN' || req.session.currentUser.role === 'CREATOR'
            })
        })
        .catch(err => console.log(err))
})

router.get("/crear", checkRole('CREATOR', 'ADMIN'), (req, res, next) => {
    User
        .find({ "role": { $in: ["CREATOR", "ADMIN"] } })
        .then(users => res.render("events/create-event", { users }))
        .catch(err => console.log(err))
})

router.post("/crear", checkRole('CREATOR', 'ADMIN'), (req, res, next) => {

    const { name, latitude, longitude, date, imageUrl, description, creator } = req.body

    const place = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ name, place, date, imageUrl, description, creator })
        .then(() => res.redirect("/eventos"))
        .catch(err => console.log(err))

})

router.get("/:event_id", isLoggedIn, (req, res, next) => {
    let littledate
    const { event_id } = req.params
    Event
        .findById(event_id)
        .populate("participants")
        .then(event => {
            if (event.date) {
                littledate = date.formatDate(event.date)
            }
            res.render("events/details", {
                event,
                littledate,
                isAdminOrCreator: req.session.currentUser.role === 'ADMIN' || req.session.currentUser.role === 'CREATOR',
                isAdmin: req.session.currentUser.role === 'ADMIN'
            })
        })
        .catch(err => console.log(err))
})

router.get("/:event_id/editar", checkRole('CREATOR', 'ADMIN'), (req, res, next) => {
    let littledate
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            if (event.date) {
                littledate = date.formatDate(event.date)
            }
            res.render("events/edit", { event, littledate })
        })
        .catch(err => console.log(err))

})

router.post("/:event_id/editar", checkRole('CREATOR', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params

    const { name, latitude, longitude, date, imageUrl, description } = req.body

    const place = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(event_id, { name, place, date, imageUrl, description })
        .then(() => res.redirect("/eventos"))
        .catch(err => console.log(err))

})

router.post("/:event_id/eliminar", checkRole('ADMIN'), (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect("/eventos"))
        .catch(err => console.log(err))

})

router.post("/:event_id/apuntarse", (req, res, next) => {
    const { event_id } = req.params
    Event
        .findByIdAndUpdate(event_id, { $push: { participants: req.session.currentUser._id } })
        .then(() => res.redirect(`/eventos/${event_id}`))
        .catch(err => console.log(err))
})

module.exports = router