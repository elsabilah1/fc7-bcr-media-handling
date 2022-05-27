const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')

const app = express()
require('dotenv').config()
require('./src/configs/db')
require('./src/configs/passport')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.listen(process.env.PORT)
