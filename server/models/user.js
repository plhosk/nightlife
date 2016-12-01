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

userSchema.pre('save', (done) => {
  const user = this
  if (!user.isModified('password')) {
    return done()
  }
  return bcrypt.genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(user.password, salt, null))
    .then((passwordHash) => {
      user.password = passwordHash
      return done()
    })
    .catch(err => done(err))
})

userSchema.methods.validatePassword = (inputPassword, done) => {
  bcrypt.compare(inputPassword, this.password, (error, isValid) => {
    done(error, isValid)
  })
}

userSchema.methods.name = () => this.displayName || this.local.username
userSchema.methods.getId = () => this._id //eslint-disable-line

module.exports = mongoose.model('User', userSchema)
