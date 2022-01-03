const express = require('express')

const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send(`Phonebook has info of ${persons.length} people<br>${Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined && body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (body.name === undefined && body.number !== undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (body.name !== undefined && body.number === undefined) {
        return response.status(400).json({
            error: 'body missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            name: body.name,
            phone: body.phone,
            id: Math.floor(Math.random() * 100000),
        }
        persons.concat(person)
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    console.log(persons);
})


const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`);