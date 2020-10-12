const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Match = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    votes1: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    votes2: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('matches', Match)