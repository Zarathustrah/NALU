const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const achievedSurfSpotSchema = new mongoose.Schema({
  spot: { type: mongoose.Schema.ObjectId, ref: 'SurfSpot', required: true }
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  achievedSurfSpot: [achievedSurfSpotSchema]
})

// ! Add created in virtual field (not in db)
userSchema
  .virtual('createdSpots', {
    ref: 'SurfSpot',
    localField: '_id',
    foreignField: 'user'
  })

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema 
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema
  .set('toJSON', {
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)