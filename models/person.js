const mongoose = require('mongoose')


/*Tähän tulee url */
const url = 'mongodb://korttipakka:jokeri18@ds133353.mlab.com:33353/puhelinluettelo-numerot'
/*Tähän tulee url */

/*
const url = process.env.MONGODB_URI
 */

mongoose.connect(url)

/* Joku käytti seuraavaa muotoa function(person){return { id: _id, name };} */

/*
const Schema = mongoose.Schema
const personSchema = new Schema({ name: String, number: String })

const Person = mongoose.model('Person', personSchema)

personSchema.statics.formatPerson2 = function (person) {
    return this.model('Person').find({name: this.name}, person) 
};
*/


const Person = mongoose.model('Person', {
    name: String,
    number: String,
})

module.exports = Person