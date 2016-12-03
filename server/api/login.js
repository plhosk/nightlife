const express = require('express')
const passport = require('passport')

const router = express.Router()

router.route('/')
  .post((req, res, next) => {
    passport.authenticate('login', (err, user) => { //eslint-disable-line
      if (err) {
        return res.sendStatus(500)
      }
      if (!user) {
        return res.status(401).send({
          message: 'authentication failed',
        })
      }
      req.login(user, (err) => { //eslint-disable-line
        if (err) {
          return res.sendStatus(500)
        }
        return res.status(200).send({
          id: user._id, //eslint-disable-line
          username: user.local.username,
        })
      })
    })(req, res, next)
  })

  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send({
        id: req.user._id, //eslint-disable-line
        username: req.user.local.username,
      })
    } else {
      res.sendStatus(204)
    }
  })

module.exports = router
