const mongoose = require('mongoose')

const url = 'mongodb://<dbuser>:<password>@ds133353.mlab.com:33353/puhelinluettelo-numerot'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name : String,
    number: String,

})

module.exports = Person