require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../utils/logger')

const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to mongodb')
})

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject)=>{
    returnedObject['id'] = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)