const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        place: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            },
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: String,
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        participants: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Event = model("Event", eventSchema)

module.exports = Event
