require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const PhoneNumber = require('./models/phonenumber')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (request, response) => {
  response.send(`Phonebook has info of ${persons.length} people<br>${Date()}`)
})

app.get('/api/persons', (request, response) => {
  PhoneNumber.find({}).then((numbers) => {
    response.json(numbers)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  PhoneNumber.findById(request.params.id).then((number) => {
    response.json(number)
  }).catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request

  if (body.name === undefined && body.number === undefined) {
    return response.status(400).json({
      error: 'content missing',
    })
  } if (body.name === undefined && body.number !== undefined) {
    return response.status(400).json({
      error: 'name missing',
    })
  } if (body.name !== undefined && body.number === undefined) {
    return response.status(400).json({
      error: 'body missing',
    })
  } if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
  const phone = new PhoneNumber({
    name: body.name,
    number: body.number,
  })

  phone.save().then((savedNumber) => {
    console.log(savedNumber)
    response.json(savedNumber)
  }).catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  PhoneNumber.findByIdAndRemove(request.params.id).then(
    () => {
      response.status(204).end()
    },
  )
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const personUpdate = {
    name: request.body.name,
    number: request.body.number,
  }

  PhoneNumber.findByIdAndUpdate(request.params.id, personUpdate, { new: true, runValidators: true }).then(
    (number) => {
      if (number) {
        response.json(number)
      } else {
        response.status(400).send({ error: 'invalid id' })
      }
    },
  ).catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  console.log(error.name)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  }
  next()
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.debug(`Server is running on port ${PORT}`)
