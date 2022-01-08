const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URL

mongoose.connect(url).then(() => {
  console.log('mongodb connected')
}).catch((error) => {
  console.error('error connecting mongodb: ', error.message)
})

const PhoneNumber = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
})
PhoneNumber.plugin(mongooseUniqueValidator)

PhoneNumber.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  },
})

module.exports = mongoose.model('number', PhoneNumber)
