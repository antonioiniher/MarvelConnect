const { Schema, model } = require("mongoose")


// TODO: VALIDACIÓN CUSTOMIZADA
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'eL NOMBRE DE USUARIO ES OBLIGATORIO'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
    },
    description: {
      type: String,
      maxLength: 80
    },
    role: {
      type: String,
      enum: ['USER', 'CREATOR', 'ADMIN'],
      default: 'USER'
    },
    favCharacters: [{
      type: String
    }],
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
