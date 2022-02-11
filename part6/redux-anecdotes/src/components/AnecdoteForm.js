import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {

    const addNew = async (event) => {
        event.preventDefault()
        const newAnecdote = event.target.add.value
        props.addNewAnecdote(newAnecdote)
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

const ConnectedAnecdoteForm = connect(
    null,
    { addNewAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm