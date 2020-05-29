//initializing
const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//morgan middleware
morgan.token('post', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

//get info page
app.get('/info', (req, res) => {
  Person.count({}).then(count => {
    res.send(
      `<p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>`
      )
  })
})

//get list of paersons in backend
app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
      response.json(p)
    })
})

//post all person data
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })
  
  person.save().then(result => {
    response.json(result)
  })
})

//get person data by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(p => {
      if(p) {
        response.json(p)
      } else {
        response.status(404).end() 
      }
    })
    .catch((err) => {
      console.log(err)
      response.status(400).end().send({ error: 'malformatted id' })
  })
})

//delete person data by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch((err) => {
      console.log(err)
      response.status(400).end().send({ error: 'malformatted id' })
  })
})


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]







const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})