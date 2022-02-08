import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdote())
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