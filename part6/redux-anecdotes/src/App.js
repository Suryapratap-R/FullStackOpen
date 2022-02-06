import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.add.value

    dispatch({
      type: 'ADD_NEW',
      data: {
        anecdote: newAnecdote
      }
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b)=> b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='add'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App