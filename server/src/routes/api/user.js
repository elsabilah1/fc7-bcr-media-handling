const router = require('express').Router()
const { User } = require('../../models')
const passport = require('passport')

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router
