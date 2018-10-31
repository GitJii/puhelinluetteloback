const Person = require('./models/person')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


morgan.token('data', request => {
    return JSON.stringify(request.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
/*app.use(morgan('tiny'))*/

app.use(cors())

app.use(express.static('build'))


app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(Person.format(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Virheellinen id' })
        })
})

app.get('/api', (request, response) => {
    response.send('<h1> Tämä on etusivu! </h1>')
})

app.get('/api/persons/:id', (request, response) => {

    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(Person.format(person))
            } else {
                response.status(404).end()
            }

        })
        .catch(error => {
            console.log(error)
            response.status(404).send({ error: 'Vääränlainen id' })
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
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Jokin meni pieleen infossa' })
        })
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons.map(Person.format))
        })
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
    })

    if (!body.name || !body.number) {
        console.log('vaihtoehto numero 1')
        return response.status(400).json({ error: 'name or number missing' })
    }

    else {

        Person
            .find({ name: body.name })
            .then(result => {
                console.log('------------------------------------')

                if (result[0] === undefined) {

                    person
                        .save()
                        .then(savedPerson => {
                            response.json(Person.format(savedPerson))
                        })
                        .catch(error => {
                            console.log('sait napattua virheen ' + error)
                            response.status(400).send({ error: 'name or number missing' })
                        })

                } else {
                    response.status(400).send({ error: 'Henkilö on jo luettelossa' })
                }

            })
            .catch(error => {
                console.log('tapahtui virhe: ', error)
                response.status(400).send({ error: 'jotain meni pieleen' })
            })
    }
})

app.delete('/api/persons/:id', (request, response) => {

    Person
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(() => {
            response.status(400).send({ error: 'Virheellinen id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})