const express = require('express')
const router = express.Router()

const Event = require("../models/Event.model")


router.get("/events", (req, res) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => res.status(500).json({ message: 'Server issue', errorDetails: err }))
})

router.get("/events/:id", (req, res) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(events => res.json(events))
        .catch(err => res.status(500).json({ message: 'Server issue', errorDetails: err }))
})


module.exports = router