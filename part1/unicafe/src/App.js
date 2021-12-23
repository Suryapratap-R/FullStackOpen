import React, { useState } from 'react'

const statsLine = (text, value) => <>{text} {value} <br /></>

const Stats = ({good, neutral, bad}) => {
  
  return (
    <div>
      <h1>statics</h1>
      <p>
        {statsLine('good', good)}
        {statsLine('neutral', neutral)}
        {statsLine('bad', bad)}
      </p>
    </div>
  )
}

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)


const increment = (value, setValue) => setValue(value+1)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={()=>increment(good, setGood)} />
      <Button text={'neutral'} onClick={()=>increment(neutral, setNeutral)} />
      <Button text={'bad'} onClick={()=>increment(bad, setBad)} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App