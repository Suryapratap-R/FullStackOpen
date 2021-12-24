import React, { useState } from 'react'


const PhoneList = (props) =>
(
  <>
    {props.p.map((person) =>
    <div key={person.name}>
      {person.name} {person.number}
    </div>)}
  </>

)

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas',number: 1234556788}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addRecord = (event) => {
    event.preventDefault()
    console.log(persons.map((person) => person.name));
    
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addRecord}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneList p={persons} />
    </div>
  )
}

export default App