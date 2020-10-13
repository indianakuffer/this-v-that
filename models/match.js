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
    option1Color: { type: String, required: true, default: 'slateblue' },
    option2Color: { type: String, required: true, default: 'indianred' },
    votes1: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    votes2: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    count: { type: Number, default: 0, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('matches', Match)