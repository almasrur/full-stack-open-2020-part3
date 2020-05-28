require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('post', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

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

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(p => {
      response.json(p)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(p => {
      response.json(p)
    }).catch((err) => {
      response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
}) 

const generateId = () => {
    return Math.floor(Math.random() * 500)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    switch(true) {
        case !body.name:
            return response.status(400).json({ 
                error: 'name missing' 
              })
        case !body.number:
            return response.status(400).json({ 
                error: 'number missing' 
            })
        case persons.map(p => p.name.toLowerCase())
                    .includes(body.name.toLowerCase()):
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        default:
            break;
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})