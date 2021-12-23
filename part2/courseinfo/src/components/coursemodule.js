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

export default CourseModule