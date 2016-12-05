/* eslint-disable camelcase,quote-props */
const express = require('express')
const Yelp = require('yelp')
const User = require('../models/user')

const router = express.Router()

const yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
})

router.route('/')
  .post((req, res, next) => {
    if (req.isAuthenticated()) {
      User.findOne({ _id: req.user._id }) //eslint-disable-line
      .then((user) => {
        user.lastSearch = req.body.search //eslint-disable-line
        user.save()
      })
    }
    const location = req.body.search
    const category_filter = req.body.category_filter
    yelp.search({
      location,
      category_filter,
    })
    .then((data) => {
      if (data.total === 0) {
        return res.sendStatus(204)
      }
      return res.send(data.businesses)
    })
    .catch(err => next(err))
  })

module.exports = router
