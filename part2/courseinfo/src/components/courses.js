import CourseModule from './coursemodule';

const Courses = ({ courses }) => {
  return courses.map((c)=>CourseModule(c))
}

export default Courses