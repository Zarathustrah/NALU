const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const surfSpotSchema = new mongoose.Schema({
  continent: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  spot: { type: String, required: true },
  waveType: { type: String, required: true },
  difficulty: { type: String, required: true },
  season: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
} , {
  timestamps: true
})

surfSpotSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('SurfSpot', surfSpotSchema)