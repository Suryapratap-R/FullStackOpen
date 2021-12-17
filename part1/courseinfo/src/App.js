import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
 </h1>
);

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Content = (props) => (
  <>
    <Part part={props.part1.name} exercise={props.part1.exercises}/>
    <Part part={props.part2.name} exercise={props.part2.exercises}/>
    <Part part={props.part3.name} exercise={props.part3.exercises}/>
  </>
);

const Total = (props) => (
  <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
      
    </div>
  )
}

export default App