const passport = require('passport')
const { User } = require('../models')
const GithubStrategy = require('passport-github2').Strategy

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value, source: 'github' }, (err, user) => {
        if (!user) {
          const newUser = new User({
            email: profile.emails[0].value,
            firstName: profile.displayName.split(' ')[0],
            lastName: profile.displayName.split(' ')[1],
            source: 'github',
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
