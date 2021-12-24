import React, { useState } from 'react'


const PhoneList = (props) =>
(
  <>
    {props.p.map((person) =>
    <div key={person.name}>
      {person.name}
    </div>)}
  </>

)

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ 'name': newName }))
    setNewName('')
    console.log(persons);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
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