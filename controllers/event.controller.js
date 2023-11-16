const Event = require("../models/Event.model")
const User = require("../models/User.model")

const dateUtils = require('../utils/date')

const getEventList = (req, res, next) => {
    Event
        .find()
        .then(events => {
            res.render("events/list", {
                events,
                isAdminOrCreator: req.session.currentUser.role === 'ADMIN' || req.session.currentUser.role === 'CREATOR'
            })
        })
        .catch(err => next(err))
}

const getCreateEvent = (req, res, next) => {
    User
        .find({ "role": { $in: ["CREATOR", "ADMIN"] } })
        .then(users => res.render("events/create-event", { users }))
        .catch(err => next(err))
}

const postCreateEvent = (req, res, next) => {

    const { name, latitude, longitude, date, imageUrl, description, creator } = req.body

    const place = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ name, place, date, imageUrl, description, creator })
        .then(() => res.redirect("/eventos"))
        .catch(err => next(err))

}

const getEventDetails = (req, res, next) => {
    const { event_id } = req.params
    Event
        .findById(event_id)
        .populate("participants")
        .then(event => {
            const formattedDate = event.date ? dateUtils.formatDate(event.date) : undefined
            let eventState = event.participants.some(participante => {
                return participante._id.toString() === req.session.currentUser._id;
            });
            res.render("events/details", {
                event,
                formattedDate,
                eventState,
                isAdminOrCreator: req.session.currentUser.role === 'ADMIN' || req.session.currentUser.role === 'CREATOR',
                isAdmin: req.session.currentUser.role === 'ADMIN'
            })
        })
        .catch(err => next(err))
}

const getEditEvent = (req, res, next) => {

    const { event_id } = req.params;

    Event
        .findById(event_id)
        .then(event => {
            const formattedDate = event.date ? dateUtils.formatDate(event.date) : undefined
            res.render("events/edit", { event, formattedDate })
        })
        .catch(err => next(err))

}

const postEditEvent = (req, res, next) => {

    const { event_id } = eventId;

    const { name, latitude, longitude, date, imageUrl, description } = req.body

    const place = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(event_id, { name, place, date, imageUrl, description })
        .then(() => res.redirect("/eventos"))
        .catch(err => next(err))

}

const deleteEvent = (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect("/eventos"))
        .catch(err => next(err))

}

const joinEvent = (req, res, next) => {
    const { event_id } = req.params

    Event.findById(event_id)
        .then(event => {
            const { _id: currentUserID } = req.session.currentUser

            const query = !event.participants.includes(currentUserID) ? { $push: { participants: currentUserID } } : { $pull: { participants: currentUserID } }

            return Event.findByIdAndUpdate(event_id, query);
        })
        .then(() => res.redirect(`/eventos/${event_id}`))
        .catch(err => next(err))

}

module.exports = {
    getEventList,
    getCreateEvent,
    postCreateEvent,
    getEventDetails,
    getEditEvent,
    postEditEvent,
    deleteEvent,
    joinEvent
}