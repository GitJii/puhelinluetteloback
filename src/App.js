import React from 'react';
import FilterLomake from './components/FilterLomake';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  componentDidMount() {
    console.log('moi')
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }


  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  addPersonAndNumber = (event) => {

    event.preventDefault()

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const double = this.state.persons.find(person =>
      person.name === personObject.name)

    if (!this.state.persons.includes(double)) {

      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            error: personObject.name + ' lisättiin onnistuneesti',
            persons: this.state.persons.concat(newPerson),
            newNumber: '',
            newName: ''
          })
        })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

    const changedPerson = { ...personObject, number: personObject.number }
    const wantedPerson = this.state.persons.find(p =>
      p.name === personObject.name)

    if (this.state.persons.includes(wantedPerson)) {
      if (window.confirm(wantedPerson.name +
        ' on jo luettelossa, korvataanko vanha numero uudella?')
      )

      console.log(changedPerson)

        personService
          .update(wantedPerson.id, changedPerson)
          .then(changedPerson => {
            this.setState({
              error: `Henkilön ${wantedPerson.name} numero muutettiin onnistuneesti.`,
              persons: this.state.persons.map(p => p.id !== wantedPerson.id ? p : changedPerson), 
              newNumber: '',
              newName: ''
            })
            setTimeout(() => {
              this.setState({ error: null })
            }, 5000)
          })
          .catch(
            this.setState({
              error: `Henkilö ${wantedPerson.name} on jo valitettavasti poistettu palvelimelta`,
              persons: this.state.persons.filter(p => p.id !== wantedPerson.id)
            })
          )
    }
  }

  deletePersonAndNumber = (id) => {

    const personsid = id
    const deletedPerson = this.state.persons.find(person =>
      person.id === personsid)

    if (window.confirm('Poistetaanko ' +
      deletedPerson.name)
    )

      personService
        .remove(personsid)
        .then(() => {
          const persons =
            this.state.persons.filter(
              p => p.id !== personsid)
          this.setState({
            error: ` ${deletedPerson.name}  poistettiin onnistuneesti`,
            persons: persons
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
  }


  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <Notification message={this.state.error} />

        rajaa näytettäviä <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />

        <h2>Lisää uusi</h2>

        <form onSubmit={this.addPersonAndNumber}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handlePersonChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <FilterLomake
          tila={this.state}
          onDelete={this.deletePersonAndNumber}
        />
      </div>
    )
  }
}

export default App