require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const logger = require('./utils/logger')

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() => {
  logger.info("connected to mongodb")
})

const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})