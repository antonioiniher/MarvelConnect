const express = require('express')
const router = express.Router()

const Event = require("../models/Event.model")


// TODO: GESTIONAFD CATCH CON ESTADO Y JSON

router.get("/events", (req, res) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => console.log(err))
})

router.get("/events/:id", (req, res) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(events => res.json(events))
        .catch(err => console.log(err))
})


module.exports = router