const Event = require("../models/Event.model")

const getApiEvents = (req, res) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => res.status(500).json({ message: 'Server issue', errorDetails: err }))
}

const getOneApiEvent = (req, res) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(events => res.json(events))
        .catch(err => res.status(500).json({ message: 'Server issue', errorDetails: err }))
}

module.exports = {
    getApiEvents,
    getOneApiEvent
}