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

//post new person data
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === "") {
    return response.status(400).json({ error: 'name missing' })
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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if(p) {
        response.json(p)
      } else {
        response.status(404).end() 
      }
    })
    .catch(err => next(err))
})

//delete person data by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => next(err))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

//unknownEndpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//errorHandler function
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})