const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let phonenumbers = [
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

app.get('/', (request, response) => {
    response.send('<h1> Tämä on etusivu! </h1>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonenumbers.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send('<div>puhelinluettelossa on ' + phonenumbers.length + ' henkilön tiedot</div>'
        + '<div> <br> </div>' + new Date())
})

app.get('/api/persons', (request, response) => {
    response.json(phonenumbers)
})

app.post('/api/persons', (request,response) => {
    
    const body = request.body
    
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error:'name or number missing'})
    } else if (phonenumbers.find(person => person.name === body.name)) {
        return response.status(400).json({error:'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: Math.floor(10000 * Math.random())

    }

    phonenumbers = phonenumbers.concat(person)
    console.log(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonenumbers = phonenumbers.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})