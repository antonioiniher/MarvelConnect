const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
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
    imageUrl: String,
    birthday: Date,
    description: String,
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
