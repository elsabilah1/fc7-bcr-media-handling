const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
  source: {
    type: String,
    required: true,
  },
  lastVisited: {
    type: Date,
    default: new Date(),
  },
})

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      return next()
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User
