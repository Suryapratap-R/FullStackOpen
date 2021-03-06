import React, { useState } from 'react'

const staticLine = (text, value) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Stats = ({good, neutral, bad}) => {
  const total = good+bad+neutral
  if (total > 0) {
    return (
      <div>
        <h1>statics</h1>
        <table>
          <tbody>
            {staticLine('good', good)}
            {staticLine('neutral', neutral)}
            {staticLine('bad', bad)}
            {staticLine('all', total)}
            {staticLine('average', (good-bad)/total)}
            {staticLine('positive', good/total)}
          </tbody>
        </table>
      </div>
   )
  } else {
    return (<p>No feedback given</p>)
  }
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