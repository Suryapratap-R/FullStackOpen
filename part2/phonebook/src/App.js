import React, { useState } from 'react'


const PhoneList = ({searchkey, p}) =>
{
  return <div>
    {searchkey === '' ?
      p.map((person) => <div key={person.name}>{person.name} {person.number}</div>) :
      p.filter((val) => val.name.toLowerCase().includes(searchkey.toLowerCase())).map((person) => <div key={person.name}>{person.name} {person.number} </div>)}
  </div>
}

const Filter = ({handleFilterChange}) => <div>
          filter show with <input onChange={handleFilterChange}/>
      </div>

const PersonForm = (props) =>
      <form onSubmit={props.addRecord}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  const addRecord = (event) => {
    event.preventDefault()
   
    if ((persons.map((person) => person.name).indexOf(newName)) === -1) {
      setPersons(persons.concat({ name: newName,  number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phone`)
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange = {handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addRecord={addRecord}
        handleNameChange={handleNameChange}
        newName={newName} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneList p={persons} searchkey={filterWord} />
    </div>
  )
}

export default App