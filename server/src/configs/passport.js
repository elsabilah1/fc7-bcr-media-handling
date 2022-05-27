const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { User } = require('../models')
// require('./google')
// require('./github')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
}

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.user.email === 'admin@admin.com') {
      return done(null, jwt_payload.user)
    }
    User.findById(jwt_payload.user._id, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (!user) {
        return done(null, false)
      }
      done(null, user)
    })
  })
)
