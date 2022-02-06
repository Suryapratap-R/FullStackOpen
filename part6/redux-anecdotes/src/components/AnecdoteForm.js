import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const newAnecdote = event.target.add.value
        dispatch(addNewAnecdote(newAnecdote))
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