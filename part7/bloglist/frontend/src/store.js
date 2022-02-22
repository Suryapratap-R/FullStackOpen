import { applyMiddleware, createStore, combineReducers } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import {composeWithDevTools} from '@redux-devtools/extension';
import thunk from "redux-thunk";
import blogsReducer from "./reducers/blogsReducer";

const reducer = combineReducers({
    'blogs': blogsReducer,
    'notification': notificationReducer
})
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store