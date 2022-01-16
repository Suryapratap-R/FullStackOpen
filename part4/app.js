const express = require('express')
const app = express()
require('express-async-errors')
const bloglistRouter = require('./controller/blog')
const userRouter = require('./controller/users')
const cors = require('cors')
const { errorHandler } = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', bloglistRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)
module.exports = app