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
        description: {
            type: String,
            minLength: 10
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

eventSchema.index({ location: '2dsphere' })
const Event = model("Event", eventSchema)

module.exports = Event
