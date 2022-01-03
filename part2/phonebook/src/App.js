import React, { useState, useEffect } from 'react'
import phoneService from './services/phonebook';

const NotificationBanner = ({message, messageColor}) => {
  const baseStyle = {
    color: messageColor,
    padding: '1rem',
    margin: '1rem',
    border: '4px solid',
    borderRadius: '6px',
    backgroundColor: '#C2CAD0'
  }
  if (message === null) {
    return null
  }
  return <div style={baseStyle}>{ message }</div>
}

const PersonRecord = ({name, number, deleteWithId}) => <div>{name} {number} <button onClick={deleteWithId}>delete</button></div>

const PhoneList = ({searchkey, p, deleteWithId}) =>
{
  return <div>
    {searchkey === '' ?
      p.map((person) => <PersonRecord key={person.id} name={person.name} number={person.number} deleteWithId={()=>deleteWithId(person.id)}/>) :
      p.filter((val) => val.name.toLowerCase().includes(searchkey.toLowerCase())).map((person) => <PersonRecord key={person.id} name={person.name} number={person.number}/>)}
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('black')

  const deleteWithId = (id) => {
    const confirmDelete = window.confirm(`delete ${persons.find(p=>p.id === id).name}?`)
    if (confirmDelete) {
      phoneService.deleteRecord(id).then(data => { }).catch(err => {
        setNotificationMessage(`Information of '${persons.find(p=>p.id === id).name}' has already deleted from server`)
      setNotificationColor('crimson')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 6000)
      })
      setPersons(persons.filter(p=>p.id !== id))
    }
  }

  const addNumber = (event) => {
    event.preventDefault()
   
    const newPerson = { name: newName,  number: newNumber}
    if (persons.findIndex((person) => person.name === newName) === -1) {
      phoneService.create(newPerson)
        .then(person =>
        { setPersons(persons.concat(person)) })
      
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Added ${newName}`)
      setNotificationColor('green')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 6000)
    } else {
      const replace = window.confirm(`${newName} is already added to phone, replace the old number with a new one?`)
      if (replace) {
        phoneService.update(persons.find(p => p.name === newName).id, newPerson)
        .then(person =>
        {
          setPersons(persons.map(p=>p.id!==person.id ? p : person))
        })
      setNewName('')
      setNewNumber('')
      }
    }
  }

  const addAllPhone = () => {
    phoneService.getAll().then((phone)=>setPersons(phone))
  }
  useEffect(addAllPhone, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }
  
  const sizing = {
    width: '500px',
    margin: 'auto'
  }

  return (
    <div style={sizing}>
      <h2>Phonebook</h2>
      <NotificationBanner message={notificationMessage} messageColor={notificationColor}/>
      <Filter handleFilterChange = {handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber}
        handleNameChange={handleNameChange}
        newName={newName} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneList p={persons} searchkey={filterWord} deleteWithId={deleteWithId}/>
    </div>
  )
}

export default App