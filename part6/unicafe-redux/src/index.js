import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/unicafeReducer';

const store = createStore(reducer)

const App = () => (
  <div>
    <div>good {store.getState().good}</div>
    <div>ok {store.getState().ok}</div>
    <div>bad {store.getState().bad}</div>
    <button onClick={()=>{store.dispatch({ type: 'GOOD' })}}>good</button>
    <button onClick={()=>{store.dispatch({type: 'OK'})}}>ok</button>
    <button onClick={()=>{store.dispatch({type: 'BAD'})}}>bad</button>
  </div>
)



const render = () => ReactDOM.render(<App />, document.getElementById('root'));

render()
store.subscribe(render)