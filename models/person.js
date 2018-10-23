const mongoose = require('mongoose')

/*Tähän tulee url */

/*Tähän tulee url */

mongoose.connect(url)
/*
const Schema = mongoose.Schema
const personSchema = new Schema({ name: String, number: String })

const Person = mongoose.model('Person', personSchema)

personSchema.statics.formatPerson2 = function (person) {
    return this.model('Person').find({name: this.name}, person) 
};
/*
const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

*/

const Person = mongoose.model('Person', {
    name: String,
    number: String,
})

module.exports = Person