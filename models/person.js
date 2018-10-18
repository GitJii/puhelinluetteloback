const mongoose = require('mongoose')


mongoose.connect(url)

const Person = mongoose.model('Person', {
    name : String,
    number: String,

})

module.exports = Person