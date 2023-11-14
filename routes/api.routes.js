const express = require('express')
const router = express.Router()

const Event = require("../models/Event.model")

router.get("/events", (req, res, next) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => console.log(err))
})

router.get("/events/:id", (req, res, next) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(events => res.json(events))
        .catch(err => console.log(err))
})

















module.exports = router