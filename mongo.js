const mongoose = require('mongoose')

/* Tähän tulee url*/

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String

})

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]

})

if (process.argv[2] !== undefined && process.argv[3] !== undefined) {
    console.log('lisätään henkilö ' + process.argv[2] +
        ' numero ' + process.argv[3] + ' luetteloon')
        person.save()
        .then(response => {
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo: ')
            result.forEach(person => {
                console.log(person.name + ' ' + person.number)
            })
            mongoose.connection.close()
        })
}

