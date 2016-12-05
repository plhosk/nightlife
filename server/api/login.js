/* eslint-disable no-underscore-dangle */
const express = require('express')
const passport = require('passport')

const router = express.Router()

router.route('/')
  .post((req, res, next) => {
    passport.authenticate('login', (errAuth, user) => {
      if (errAuth) {
        return next(errAuth)
      }
      if (!user) {
        // username not found
        return res.status(401).send({
          message: 'authentication failed',
        })
      }
      return req.login(user, (errLogin) => {
        if (errLogin) {
          return next(errLogin)
        }
        // login successful. send user info
        let attending = ''
        if (user.attending.length > 0) {
          attending = user.attending[0].yelpId
        }
        return res.send({
          id: user._id,
          username: user.name(),
          lastSearch: user.lastSearch,
          attending,
        })
      })
    })(req, res, next)
  })

  .get((req, res) => {
    if (req.isAuthenticated()) {
      let attending = ''
      if (req.user.attending.length > 0) {
        attending = req.user.attending[0].yelpId
      }
      res.send({
        id: req.user._id,
        username: req.user.name(),
        lastSearch: req.user.lastSearch,
        attending,
      })
    } else {
      res.sendStatus(204) // user not authenticated. send 204 (no content)
    }
  })

module.exports = router
