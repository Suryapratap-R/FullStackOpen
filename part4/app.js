const express = require('express')
const app = express()
const bloglistRouter = require('./controller/blog')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', bloglistRouter)


module.exports = app