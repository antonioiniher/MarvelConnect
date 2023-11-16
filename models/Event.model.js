const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio.']
        },
        place: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number],
            },
        },
        date: {
            type: Date,
            required: [true, 'El nombre de usuario es obligatorio.']
        },
        imageUrl: {
            type: String,
            required: [true, 'La imagen es obligatoria.']
        },
        description: {
            type: String,
            minLength: [10, 'Mínimo 10 caracteres.']
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

eventSchema.index({ place: '2dsphere' })
const Event = model("Event", eventSchema)

module.exports = Event
