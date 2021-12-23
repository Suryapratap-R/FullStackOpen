import React from 'react'

// const Header = (props) => (
//   <h1>
//     {props.course}
//  </h1>
// );

// const Part = (props) => (
//   <p>{props.part} {props.exercise}</p>
// )

// const Content = (props) => (
//   <>
//     <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
//     <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
//     <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
//   </>
// );

// const Total = (props) => (
//   <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
// )

const Course = ({course}) => {
  return (
    <>
    <h1 key={course.id}>{course.name}</h1>
      {course.parts.map((part) => <div key={part.id}>{part.name} { part.exercises }</div>)}
    <strong>total of {course.parts.reduce((sum, part)=>part.exercises+sum, 0)} exercises</strong>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App