/* eslint-disable prefer-arrow-callback, func-names */

const passport = require('passport')
const User = require('./models/user')

const LocalStrategy = require('passport-local').Strategy

passport.use('login', new LocalStrategy(function (username, password, done) {
  User.findOne({
    'local.username': username,
  }, function (errFind, user) {
    if (errFind) {
      return done(errFind)
    }
    if (!user) {
      return done(null, false, {
        message: 'No user has that username!',
      })
    }
    return user.validatePassword(password, function (errValidate, isMatch) {
      if (errValidate) {
        return done(errValidate)
      }
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, {
        message: 'Invalid password.',
      })
    })
  })
}))

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id) //eslint-disable-line
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
