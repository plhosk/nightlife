/* eslint-disable func-names, prefer-arrow-callback */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  local: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  displayName: String,
})

const SALT_FACTOR = 10

userSchema.pre('save', function (done) {
  const user = this
  if (!user.isModified('local.password')) {
    return done()
  }

  return bcrypt.genSalt(SALT_FACTOR, (errSalt, salt) => {
    if (errSalt) {
      return done(errSalt)
    }
    return bcrypt.hash(user.local.password, salt, null, (errHash, passwordHash) => {
      if (errHash) {
        return done(errHash)
      }
      user.local.password = passwordHash
      return done()
    })
  })
})

userSchema.methods.validatePassword = function (inputPassword, done) {
  bcrypt.compare(inputPassword, this.local.password, function (error, isValid) {
    done(error, isValid)
  })
}

userSchema.methods.name = function () {
  return this.displayName || this.local.username
}

userSchema.methods.getId = function () {
  return this._id //eslint-disable-line
}

module.exports = mongoose.model('User', userSchema)
