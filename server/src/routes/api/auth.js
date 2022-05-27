const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { User } = require('../../models')

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

// register
router.post('/register', (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body

    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
      source: 'local',
    })

    newUser.save((err) => {
      if (err) {
        return res.status(400).send('email already exists.')
      }

      const token = generateToken(newUser.toJSON())
      res.status(200).json({ success: true, token })
    })
  } catch (err) {
    return res.status(500).send(err)
  }
})

// login
router.post('/login', (req, res) => {
  try {
    const adminData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@admin.com',
      password: 'admin',
      role: 1,
      source: 'local',
    }

    const { email, password } = req.body

    if (adminData.email === email) {
      if (adminData.password !== password) {
        return res.status(401).send('invalid email or password')
      }

      const token = generateToken(adminData)
      res.status(200).json({ success: true, token })
    } else {
      User.findOne({ email }, (err, user) => {
        if (err) throw err

        if (!user) {
          res.status(401).send('invalid email or password')
        } else {
          user.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              User.findByIdAndUpdate(user._id, { lastVisited: `${new Date()}` }, (err, user) => {
                const token = generateToken(user.toJSON())
                res.status(200).json({ success: true, token })
              })
            } else {
              res.status(401).send('invalid email or password')
            }
          })
        }
      })
    }
  } catch (err) {
    return res.status(500).send(err)
  }
})

// Login Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

// Google Callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user)
    const redirectWithToken = `
    <html>
      <script>
        window.location.href = '${process.env.CLIENT_URL}?token=${token}';
      </script>
    </html>
    `
    res.send(redirectWithToken)
  }
)

// Auth Github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile', 'user:email'],
  })
)

// Github Callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login/failed',
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user)
    const redirectWithToken = `
    <html>
      <script>
        window.location.href = '${process.env.CLIENT_URL}?token=${token}';
      </script>
    </html>
    `
    res.send(redirectWithToken)
  }
)

// Failed Redirect
router.get('/login/failed', (req, res) => {
  res.status(401).send('login failed')
})

module.exports = router
