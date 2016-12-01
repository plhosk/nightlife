const passport = require('passport')
const User = require('./models/user')

const LocalStrategy = require('passport-local').Strategy

passport.use('login', new LocalStrategy((username, password, done) => {
  User.findOne({ 'local.username': username }).then((user) => {
    if (!user) {
      return done(null, false, {
        message: 'No user has that username!',
      })
    }
    return user.validatePassword(password).then((isMatch) => {
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, {
        message: 'Invalid password.',
      })
    })
    .catch(err => done(err, user))
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
