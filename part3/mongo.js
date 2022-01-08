const mongoose = require('mongoose')

const args = process.argv

const password = args[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.hdxwo.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)
const PhoneNumber = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = new mongoose.model('number', PhoneNumber)

if (args.length === 3) {
  console.log('length 3')
  Phone.find({}).then((result) => {
    result.forEach((num) => {
      console.log(`${num.name} ${num.number}`)
    })
    mongoose.connection.close()
  })
} else if (args.length === 5) {
  const name = args[3]
  const number = args[4]

  const phone = new Phone({
    name,
    number,
  })
  phone.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.error('no number match')
  process.exit(1)
}
