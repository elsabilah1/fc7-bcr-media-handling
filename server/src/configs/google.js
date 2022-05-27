const passport = require('passport')
const { User } = require('../models')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value, source: 'google' }, (err, user) => {
        if (!user) {
          const newUser = new User({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            source: 'google',
          })

          newUser.save()
          return done(null, newUser)
        }

        User.findByIdAndUpdate(user._id, { lastVisited: new Date() })
        return done(null, user)
      })
    }
  )
)
