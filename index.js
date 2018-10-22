const Person = require('./models/person')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('data', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
/*app.use(morgan('tiny'))*/

app.use(cors())

app.use(express.static('build'))
/*
let persons = [
    {
        name: 'Tero Pitkämäki',
        number: '040-2349873249',
        id: 1
    },
    {
        name: 'Matti Muukalainen',
        number: '040-2340983411',
        id: 2
    },
    {
        name: 'Anselmi Ansalainen',
        number: '040-3204987324987',
        id: 3
    },
    {
        name: 'Leonhard Euler',
        number: '040-31415312',
        id: 4
    }
]
*/

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get('/api', (request, response) => {
    response.send('<h1> Tämä on etusivu! </h1>')
})

app.get('/api/persons/:id', (request, response) => {

    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(formatPerson(person))
            } else {
                response.status(404).end()
            }
        })
})

app.get('/api/info', (request, response) => {

    Person
        .find({})
        .count()
        .then(maara => {
            response.send('<div>puhelinluettelossa on ' + maara + ' henkilön tiedot</div>'
                + '<div> <br> </div>' + new Date())
        })
})

app.get('/api/persons', (request, response) => {

    Person
        .find({})
        .then(persons => {
            response.json(persons.map(formatPerson))
        })

    /*response.json(persons)*/
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
    })

    person
        .save()
        .then(savedPerson => {
            response.json(formatPerson(savedPerson))
        })
    /*
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    } else {
        person
            .save()
            .then(savedPerson => {
                response.json(formatPerson(savedPerson))
            })
        /* .catch(error => {
             console.log('sait napattua virheen ' + error)
         })

            }
       */
})

app.delete('/api/persons/:id', (request, response) => {

    Person
        .findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})