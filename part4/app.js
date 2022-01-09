const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bloglistRouter = require('./controller/bloglist')
const cors = require('cors')




app.use(cors())
app.use(express.json())

app.use('/api/blogs', bloglistRouter)

module.exports = app