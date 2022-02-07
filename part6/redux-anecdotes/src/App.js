import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdoteService from './services/anecdote';

const App = () => {
  const dispatch = useDispatch()
  useEffect(async() => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ADD_INIT',
      data: anecdotes
    })
  },[dispatch])
  return (
    <div>
      <Filter/>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App