require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const bloglistRouter = require('./controller/blog')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose');


const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL

mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to mongodb')
})


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', bloglistRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
module.exports = app