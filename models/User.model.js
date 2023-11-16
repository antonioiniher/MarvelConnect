const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre de usuario es obligatorio.'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'El email es obligatorio.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.']
    },
    imageUrl: {
      type: String,
      required: [true, 'La imagen es obligatoria.']
    },
    birthday: {
      type: Date,
    },
    description: {
      type: String,
      maxLength: [80, 'Longitud máxima de 80 caracteres.']
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
