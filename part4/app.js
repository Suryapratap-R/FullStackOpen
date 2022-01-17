const express = require('express')
const app = express()
require('express-async-errors')
const bloglistRouter = require('./controller/blog')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const cors = require('cors')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', bloglistRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
module.exports = app