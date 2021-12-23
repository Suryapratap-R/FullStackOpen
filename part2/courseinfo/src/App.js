import React from 'react'

const CourseModule = (course) => {
  return (
    <div key={course.id}>
      <h2 key={course.id}>{course.name}</h2>
          {course.parts.map((part) =>
            <div key={part.id}>
              {part.name} {part.exercises}
            </div>
            )}
      <strong>total of {course.parts.reduce((sum, part)=>part.exercises+sum, 0)} exercises</strong>
    </div>
  )
}

const Course = ({ courses }) => {
  return courses.map((c)=>CourseModule(c))

}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <Course courses={courses} />
}

export default App