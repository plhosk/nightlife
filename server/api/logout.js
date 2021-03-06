const express = require('express')

const router = express.Router()

router.route('/')
  .delete((req, res) => {
    req.logOut()
    req.session.destroy(() => {
      res.sendStatus(200)
    })
  })

module.exports = router
