/* eslint-disable quote-props */

const express = require('express')

const router = express.Router()
const User = require('../models/user')

router.route('/')
  .post((req, res, next) => {
    User.count({
      'attending': {
        '$elemMatch': {
          'yelpId': req.body.yelpId,
        },
      },
    })
    .then((count) => {
      res.status(200).send({
        yelpId: req.body.yelpId,
        count,
      })
    })
    .catch(err => next(err))
  })

  .put((req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401)
    }
    return User.findOne({ _id: req.user._id }) // eslint-disable-line no-underscore-dangle
    .then((user) => {
      if (!user) {
        return res.sendStatus(500)
      }
      while (user.attending.length > 0) {
        user.attending.pop()
      }
      user.attending.push({ yelpId: req.body.yelpId })
      return user.save().then(() => {
        res.sendStatus(200)
      })
    })
    .catch(err => next(err))
  })

module.exports = router
