const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    googleId: { type: String, index: true, unique: true, required: true },
    email: { type: String, required: true },
    familyName: { type: String, required: true },
    givenName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)