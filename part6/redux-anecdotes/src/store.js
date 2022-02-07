import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";


const reducer = combineReducers({
    notification: notificationReducer,
    anecdote: anecdoteReducer,
    filter: filterReducer
})
const store = createStore(reducer)

export default store