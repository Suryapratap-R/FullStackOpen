import React, { useState, useEffect } from 'react'
import axios from 'axios';


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
      <form onSubmit={props.addNumber}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
   
    if ((persons.map((person) => person.name).indexOf(newName)) === -1) {
      const newPerson = { name: newName,  number: newNumber}
      axios.post('http://localhost:3001/persons', newPerson)
        .then(response =>
        { setPersons(persons.concat(response.data)) })
      
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phone`)
    }
  }

  const fetchApi = () => {
    axios.get('http://localhost:3001/persons').then((response)=>setPersons(response.data))
  }
  useEffect(fetchApi, [])

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
      <PersonForm addNumber={addNumber}
        handleNameChange={handleNameChange}
        newName={newName} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneList p={persons} searchkey={filterWord} />
    </div>
  )
}

export default App