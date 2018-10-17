const mongoose = require('mongoose')


mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String

})

const person = new Person({
    name: 'Jasso Morese',
    number: '040-1239898123123'

})

/*
person
    .save()
    .then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
  */  

Person
    .find({})
    .then(result=>{
        result.forEach(person =>{
            console.log(person)
        })
        mongoose.connection.close()
    })