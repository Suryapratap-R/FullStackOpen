require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongodb");
})

const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})