import { applyMiddleware, createStore } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import {composeWithDevTools} from '@redux-devtools/extension';
import thunk from "redux-thunk";

// const reducer = combineReducers()
const store = createStore(notificationReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store