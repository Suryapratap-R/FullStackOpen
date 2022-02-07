import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer';
import { notificationChanger } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== '') {
            return state.anecdote.filter(a => a.content.includes(state.filter))
        }
        return state.anecdote
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
        dispatch(notificationChanger(`you voted '${anecdotes.find(a=>a.id === id).content}'`))
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
        </div>
    )
}

export default AnecdoteList