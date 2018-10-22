const mongoose = require('mongoose')

/*Tähän tulee url */

/*Tähän tulee url */

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name : String,
    number: String,
})



module.exports = Person