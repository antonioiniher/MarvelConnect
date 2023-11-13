const express = require("express")
const router = express.Router()

const Event = require("../models/Event.model")
const User = require("../models/User.model")

router.get("/", (req, res, next) => {
    Event
        .find()
        .then(events => res.render("events/list", { events }))
        .catch(err => console.log(err))
})

router.get("/crear", (req, res, next) => {

    User
        .find({ "role": { $in: ["CREATOR", "ADMIN"] } })
        .then(users => res.render("events/create-event", { users }))
        .catch(err => console.log(err))

})

router.post("/crear", (req, res, next) => {
    const evento = { name, latitude, longitude, date, description, creator } = req.body

    const place = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }


    Event
        .create({ name, place, date, description, creator })
        .then(() => res.redirect("/eventos"))
        .catch(err => console.log(err))
})

router.get("/:user_id", (req, res, next) => {
    res.send("hola")
})

router.get("/:user_id/editar", (req, res, next) => {
    res.send("hola")
})

router.post("/:user_id/editar", (req, res, next) => {
    res.send("hola")
})

router.get("/:user_id/eliminar", (req, res, next) => {
    res.send("hola")
})



module.exports = router