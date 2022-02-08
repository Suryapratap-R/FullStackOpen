import { createStore, combineReducers, applyMiddleware } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';


const reducer = combineReducers({
    notification: notificationReducer,
    anecdote: anecdoteReducer,
    filter: filterReducer
})
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store