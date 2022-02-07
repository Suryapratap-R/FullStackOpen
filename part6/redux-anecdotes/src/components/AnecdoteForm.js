import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdote';

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const newAnecdote = event.target.add.value
        const response = await anecdoteService.createNew(newAnecdote)
        dispatch(addNewAnecdote(response))
        event.target.add.value = ''
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name='add'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm