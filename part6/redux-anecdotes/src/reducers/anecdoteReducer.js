import anecdoteService from "../services/anecdote"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const increaseVote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(a => a.id === id ? increaseVote : a)
    case 'ADD_NEW':
      return state.concat(action.data.anecdote)
    case 'ADD_INIT':
      return action.data
    default:
      return state
  }
}
export const addNewAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD_NEW',
      data: {
        anecdote
        }
    })
}}
export const addVote = (id) => ({
  type: 'VOTE',
  data: {id}
})

export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    return dispatch({
      type: 'ADD_INIT',
      data: anecdotes
    })
  }
}

export default reducer