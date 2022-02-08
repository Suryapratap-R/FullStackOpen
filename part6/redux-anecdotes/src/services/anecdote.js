import axios from 'axios';

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {votes: anecdote.votes+1})
    return response.data
}


const anecdoteService = { getAll, createNew, vote }

export default anecdoteService